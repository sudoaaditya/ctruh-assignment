import * as THREE from 'three';
import Experience from "../Experience";
import EventEmitter from "../utils/EventEmitter"
import { TransformControls } from 'three/examples/jsm/Addons.js';

export default class World extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.renderer = this.experience.renderer;
        this.orbitControls = this.experience.camera.controls;

        this.objects = [];
        this.transformMode = "translate"

        this.addEnvironmentLights();
        this.addHelperGrid();
        this.setUpTransformControls();

        this.experience.on("objectAdded", this.objectAdded);
        this.experience.on("objectSelected", this.onObjectSelected);
        this.experience.on("updateSelectionBox", this.onUpdateSelectionBox);
    }

    setUpTransformControls = () => {
        this.box = new THREE.Box3();

        this.selectionBox = new THREE.BoxHelper();
        this.selectionBox.material.depthTest = false;
        this.selectionBox.material.transparent = true;
        this.selectionBox.visible = false;
        this.scene.add(this.selectionBox);

        var objPosOnDown = null;
        var objRotOnDown = null;
        var objScaleOnDown = null;

        this.transformControls = new TransformControls(
            this.camera.instance,
            this.canvas
        );

        this.transformControls.addEventListener("change", () => {
            var object = this.transformControls.object;
            if (object !== undefined) {
                this.selectionBox.setFromObject(object);
                this.experience.trigger("refreshUIData", [object]);
            }
        });

        this.transformControls.addEventListener("mouseDown", () => {
            var object = this.transformControls.object;

            objPosOnDown = object.position.clone();
            objRotOnDown = object.rotation.clone();
            objScaleOnDown = object.scale.clone();

            this.orbitControls.enabled = false;
        });

        this.transformControls.addEventListener("mouseUp", () => {
            var object = this.transformControls.object;

            if (object !== undefined) {

                switch (this.transformControls.getMode()) {
                    case "translate":
                        if (!objPosOnDown.equals(object.position)) {
                            this.experience.trigger("objectChanged", [object, 'position', objPosOnDown]);
                        }
                        break;

                    case "rotate":
                        if (!objRotOnDown.equals(object.rotation)) {
                            this.experience.trigger("objectChanged", [object, 'rotation', objRotOnDown]);
                        }
                        break;

                    case "scale":
                        if (!objScaleOnDown.equals(object.scale)) {
                            this.experience.trigger("objectChanged", [object, 'scale', objScaleOnDown]);
                        }
                        break;

                    default:
                        break;
                }
            }
            this.orbitControls.enabled = true;
        });

        this.scene.add(this.transformControls);

        this.raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var onDownPos = new THREE.Vector2();
        var onUpPos = new THREE.Vector2();

        const getIntersects = (point, objects) => {
            mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
            this.raycaster.setFromCamera(mouse, this.camera.instance);
            return this.raycaster.intersectObjects(objects);
        };

        const getMousePos = (dom, x, y) => {
            var rect = dom.getBoundingClientRect();
            return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
        };

        const onMouseDown = (e) => {
            var array = getMousePos(this.canvas, e.clientX, e.clientY);
            onDownPos.fromArray(array);

            document.addEventListener("mouseup", onMouseUp, false);
        };

        const onMouseUp = (e) => {
            var array = getMousePos(this.canvas, e.clientX, e.clientY);
            onUpPos.fromArray(array);

            handleClick();

            document.removeEventListener("mouseup", onMouseUp, false);
        };

        const handleClick = () => {
            if (!this.navigationTracking && onDownPos.distanceTo(onUpPos) === 0) {
                var intersects = getIntersects(onUpPos, this.objects);
                if (intersects.length > 0) {
                    var object = intersects[0].object;

                    this.experience.select(object);
                } else {
                    this.experience.deselect();
                }
            }
        };

        this.canvas.addEventListener("mousedown", onMouseDown, false);
    }

    objectAdded = (object) => {
        object.traverse((child) => {
            this.objects.push(child);
        });
    }

    onObjectSelected = (object) => {

        this.selectionBox.visible = false;
        this.transformControls.detach();

        if (object !== null) {
            this.box.setFromObject(object);
            if (this.box.isEmpty() === false) {
                this.selectionBox.setFromObject(object);
                this.selectionBox.visible = true;
            }
            this.transformControls.attach(object);
        }

    }

    onUpdateSelectionBox = (object) => {
        if (object && this.transformControls.object === object) {
            this.selectionBox.visible = false;
            this.box.setFromObject(object);
            if (this.box.isEmpty() === false) {
                this.selectionBox.setFromObject(object);
                this.selectionBox.visible = true;
            }
        }
    }


    transformModeChanged = (mode) => {
        if (mode !== this.transformMode) {
            this.transformMode = mode;
            this.transformControls.setMode(mode);
        }
    }

    addEnvironmentLights = () => {
        this.sunLight = new THREE.AmbientLight('#ffffff', 3);
        this.sunLight.position.set(0, 100, 0);
        this.scene.add(this.sunLight);
    }

    addHelperGrid = () => {
        this.gridHelper = new THREE.GridHelper(50, 50, "#555555", "#bfbfbf");
        this.gridHelper.position.set(0, -0.1, 0);
        this.scene.add(this.gridHelper);
    }
}