import * as THREE from 'three';
import EventEmitter from "./utils/EventEmitter";
import Resizer from './utils/Resizer';
import Time from './utils/Time';
import Camera from './utils/Camera';
import Renderer from './utils/Renderer';
import ObjectLoader from './utils/Resources';
import World from './world/World';

let instance = null;

export default class Experience extends EventEmitter {
    constructor(name, canvas, callbacks) {
        super();

        if (instance) return instance;

        instance = this;

        this.canvas = canvas;
        this.callbacks = callbacks;

        // helpers
        this.contentLoaded = false;

        this.sizes = new Resizer();
        this.time = new Time();

        // scene setup
        this.scene = new THREE.Scene();
        this.scene.name = name;

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new ObjectLoader();
        this.world = new World();

        this.sizes.on("resize", this.resize);
        this.time.on("tick", this.update);
        this.resources.on("ready", this.makeHTMLVisible);
        this.resources.on("resourceFailed", this.onResourceError)
        this.on("objectChanged", this.objectChanged);

        // global instance
        window.experience = this;
    }


    select = (object, triggerCB = true) => {
        if (object !== null && this.selectedObject === object) return;

        this.previousSelected = this.selectedObject;
        this.selectedObject = object;

        this.trigger("objectSelected", [object]);
        triggerCB && this.callbacks.onSelectMesh(object);
    };

    deselect = () => {
        this.select(null);
    };

    addObjects = (object) => {
        this.scene.add(object);
        this.trigger("objectAdded", [object]);
    };

    removeObject = (object) => {
        if (object?.parent === null) return;

        this.scene.remove(object);

        this.trigger("objectRemoved", [object, delayAutosave, isVersionSwitch]);
    };

    objectChanged = (object, operation, oldValue) => {
        this.callbacks.onUpdateMesh(object, operation);
    }

    resize = () => {
        this.camera.resize();
        this.renderer.resize();
    };

    update = () => {
        this.camera.update();
        this.renderer.update();
    }

    clearAndReset = () => {
        this.trigger("clearAndReset");
        while (this.scene?.children.length) {
            this.scene.remove(this.scene.children[0]);
        }
        delete this;
        instance = null;
    };

    // helpers

    makeHTMLVisible = (object) => {
        this.contentLoaded = true;
        this.callbacks.onContentLoaded(true, object);
    }

    onResourceError = () => {
        this.callbacks.onContentLoadFailed();
    }

    initResourceLoading = (model) => {
        if (!this.contentLoaded) {
            this.resources.loadModel(model);
        }
    }

    changeTransformMode = (mode) => {
        this.world.transformModeChanged(mode);
    }

    setMesh = (object) => {
        this.select(object, false)
    }

    updateTransformations = (position, rotation, scale) => {
        if (this.selectedObject) {
            this.selectedObject.position.copy(position);
            this.selectedObject.rotation.copy(rotation);
            this.selectedObject.scale.copy(scale);
            this.trigger("updateSelectionBox", [this.selectedObject]);
        }
    }

}