import * as THREE from "three";
import Experience from "../Experience";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;

        this.initInstance();
        this.initOrbitControls();

    }

    initInstance = () => {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            2000
        );
        this.instance.position.set(8, 4, 6);
        this.instance.name = "Camera";
        this.instance.lookAt(this.scene.position);
        this.scene.add(this.instance);
    };

    initOrbitControls = () => {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
        this.controls.rotateSpeed = 0.8;
        this.controls.zoomSpeed = 0.8;
        this.controls.panSpeed = 0.8;
        this.controls.dampingFactor = 0.1;
    };

    resize = () => {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    };

    update = () => {
        this.controls?.update();
    };
}
