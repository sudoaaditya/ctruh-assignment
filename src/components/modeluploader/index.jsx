import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Upload
} from 'react-feather';
import { setModel } from '../../features/experienceSlice';

const ModelUploader = () => {

    const dispatch = useDispatch();

    const model = useSelector(state => state.experience.model);
    const formRef = useRef(null);

    const validateFile = (file) => {
        const fileExt = file.name.split(".").pop().toLowerCase();
        if (fileExt === "glb" || fileExt === "gltf") {
            return true;
        } else {
            return false;
        }
    }

    const handleFileUpload = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0]
            if (file && validateFile(file)) {
                dispatch(setModel(file));
            } else {
                alert("Please select a valid file! (.glb/.gltf)")
                formRef.current.reset();
            }
        } else {
            alert("Please upload a model!");
            formRef.current.reset();
        }
    }

    if (!model) {
        return (
            <div className='uploader'>
                <div className='uploader__header'>
                    <h1> Upload a 3D model</h1>
                    <span>(.glb/.gltf)</span>
                </div>
                <div className='uploader__btnCont'>
                    <form ref={formRef} onChange={handleFileUpload}>
                        <label htmlFor="modelInput" className='uploader__label'>
                            <Upload size={18} color="#FFF8F3" />
                            <span>Choose 3D Model</span>
                        </label>

                        <input
                            type='file'
                            id='modelInput'
                            accept='.glb,.gltf'

                            multiple={false}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default ModelUploader;