import { useDispatch, useSelector } from "react-redux"
import ModelUploader from "./modeluploader";
import { useEffect, useRef, useState } from "react";

import { Edit, Loader } from 'react-feather';

import ThreeExperience from './experience/Experience';
import TransformButtons from "./ui/TransformModes";
import Sidebar from "./ui/sidebar/Sidebar";

import {
  setModelMesh, setSelectedMesh,
  setScale, setPosition,
  setRotation,
} from "../features/experienceSlice";
import { isEqual } from "lodash";

function App() {
  const dispatch = useDispatch();

  const model = useSelector(state => state.experience.model);
  const transformMode = useSelector(state => state.experience.transformMode);
  const selectedMesh = useSelector(state => state.experience.selectedMesh);

  const position = useSelector(state => state.experience.position);
  const rotation = useSelector(state => state.experience.rotation);
  const scale = useSelector(state => state.experience.scale);

  const [modelLoaded, setIsModelLoaded] = useState(false);
  const [loader, setLoader] = useState(true);
  const [selected, setSelected] = useState(null);

  const experience = useRef(null);

  useEffect(() => {
    // init the experience!
    initExperience();
  }, []);

  useEffect(() => {
    if (model && !modelLoaded) {
      setLoader(true);
      experience.current && experience.current.initResourceLoading(model);
    }
  }, [model]);

  useEffect(() => {
    if (transformMode && experience.current) {
      experience.current.changeTransformMode(transformMode);
    }
  }, [transformMode]);

  useEffect(() => {
    if (selectedMesh && selected !== selectedMesh) {
      setSelected(selectedMesh);
      experience.current.setMesh(selectedMesh);
    }
  }, [selectedMesh]);

  useEffect(() => {
    if (selected && !isEqual(position, selected?.position) || !isEqual(rotation, selected?.rotation) || !isEqual(scale, selected?.scale)) {
      experience.current && experience.current.updateTransformations(position, rotation, scale);
    }
  }, [position, rotation, scale])

  const showCanvasContentLoaded = (bFlag, object) => {
    if (bFlag) {
      setLoader(false);
      setIsModelLoaded(true);
      dispatch(setModelMesh(object));
    }
  }

  const selectMesh = (mesh) => {
    setSelected(mesh);
    dispatch(setSelectedMesh(mesh));
  }

  const updateMesh = (mesh, operation) => {
    switch (operation) {
      case "position":
        dispatch(setPosition(mesh.position.clone()))
        break;

      case "rotation":
        dispatch(setRotation(mesh.rotation.clone()))
        break;

      case "scale":
        dispatch(setScale(mesh.scale.clone()))
        break;

      default:
        break;
    }
  }

  const initExperience = () => {
    experience.current = new ThreeExperience(
      "Model", document.getElementById("webgl-canvas"),
      {
        onContentLoaded: showCanvasContentLoaded,
        onSelectMesh: selectMesh,
        onUpdateMesh: updateMesh
      }
    );
  }

  return (
    <div className="container">
      {!model && <ModelUploader />}
      {model && loader &&
        <div className="loader">
          <Loader size={100} strokeWidth={0.7} className="loader__icon" color="#758694" />
          <span className="loader__text">Loading content into scene...</span>
        </div>
      }
      {modelLoaded && <TransformButtons />}
      {modelLoaded && <Sidebar />}
      <canvas id="webgl-canvas" style={{ display: modelLoaded ? "" : "none" }}></canvas>
    </div>
  )
}

export default App
