
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import Experience from "../Experience";
import EventEmitter from "./EventEmitter";
import Model from "../objects/Model";

class ObjectLoader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();

        this.items = {};

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/')
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(dracoLoader)
        this.fileReader = new FileReader();
    }

    loadModel = (file) => {
        this.fileReader.addEventListener('load', (e) => {
            let fileName = file.name.split(".")[0];
            let content = e.target.result;

            this.gltfLoader.parse(content, "", (result) => {
                const model = new Model({
                    name: fileName,
                    model: result
                })

                this.items[name] = model;
                this.experience.addObjects(model.mesh);
                this.trigger("ready", [model.mesh]);
            }, () => this.trigger("resourceFailed"))

        });
        this.fileReader.readAsArrayBuffer(file);
    }

}

export default ObjectLoader;