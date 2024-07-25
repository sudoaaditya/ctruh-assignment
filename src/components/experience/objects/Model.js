import * as THREE from 'three';
import Experience from "../Experience";


export default class Model {
    constructor(modelProps) {
        this.experience = new Experience();
        this.modelProps = modelProps;

        this.name = modelProps.name;
        this.modelResource = modelProps.model;
        this.position = new THREE.Vector3(0, 0, 0);
        this.rotation = new THREE.Euler(0, 0, 0);
        this.scale = new THREE.Vector3(1, 1, 1);

        this.mesh = null;

        this.setModelData();
    }

    setModelData = () => {
        this.mesh = this.modelResource.scene;
        this.mesh.name = this.name;
        this.mesh.userData['type'] = "model";
        this.mesh.position.copy(this.position);
        this.mesh.scale.copy(this.scale);
        this.mesh.rotation.copy(this.rotation);
        this.mesh.visible = this.visible;
    }
}