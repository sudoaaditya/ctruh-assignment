import * as THREE from "three";
import Experience from "../Experience";

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.raycaster = new THREE.Raycaster();

        this.initInstance();
    }

    initInstance = () => {
        this.instance = new THREE.WebGLRenderer({
            antialias: this.sizes.pixelRatio > 1 ? false : true,
            canvas: this.canvas,
            powerPreference: "high-performance",
        });

        this.instance.physicallyCorrectLights = true;
        this.instance.outputColorSpace = THREE.SRGBColorSpace;
        this.instance.setClearColor("#AFAFAF");
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);

    };

    resize = () => {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    };

    update = () => {
        this.instance.render(this.scene, this.camera.instance);
    };
}
