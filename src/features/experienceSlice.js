import { createSlice } from "@reduxjs/toolkit";
import { Euler, Vector3 } from "three";

const initialState = {
  model: null,
  modelMesh: null,
  transformMode: 'translate',
  selectedMesh: null,
  position: null,
  rotation: null,
  scale: null,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setModel: (state, { payload }) => {
      return { ...state, model: payload };
    },
    setModelMesh: (state, { payload }) => {
      return {
        ...state,
        modelMesh: payload,
      }
    },
    setSelectedMesh: (state, { payload }) => {
      return {
        ...state,
        selectedMesh: payload,
        position: payload?.position || new Vector3(0, 0, 0),
        scale: payload?.scale || new Vector3(1, 1, 1),
        rotation: payload?.rotation || new Euler(0, 0, 0)
      }
    },
    setPosition: (state, { payload }) => {
      return {
        ...state,
        position: payload
      }
    },
    setRotation: (state, { payload }) => {
      return {
        ...state,
        rotation: payload
      }
    },
    setScale: (state, { payload }) => {
      return {
        ...state,
        scale: payload
      }
    },
    changeTransformMode: (state, { payload }) => {
      return {
        ...state,
        transformMode: payload || 'translate'
      }
    },
    resetState: () => {
      return { ...initialState };
    }
  }
});

export const {
  setModel, resetState,
  setModelMesh, setSelectedMesh,
  changeTransformMode, setPosition,
  setScale, setRotation
} = experienceSlice.actions;

export default experienceSlice.reducer;