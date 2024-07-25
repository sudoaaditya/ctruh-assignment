import { useDispatch, useSelector } from "react-redux";
import InputGroup from "./input-group";
import { useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";
import { setPosition, setRotation, setScale } from "../../../features/experienceSlice";


const SceneTransformations = () => {
    const dispatch = useDispatch();

    const [selectedMesh, setSelectedMesh] = useState(null);
    const [position, setPositionData] = useState(null);
    const [rotation, setRotationData] = useState(null);
    const [scale, setScaleData] = useState(null);

    const key = useRef(0)

    const state = useSelector(state => state.experience);

    useEffect(() => {
        let toUpdate = false;

        if (state.selectedMesh && !isEqual(selectedMesh, state.selectedMesh)) {
            setSelectedMesh(state.selectedMesh)
            toUpdate = true;
        }
        if (state.position && !isEqual(position, state.position)) {
            setPositionData(state.position);
            toUpdate = true;
        }
        if (state.rotation && !isEqual(rotation, state.rotation)) {
            setRotationData(state.rotation);
            toUpdate = true;
        }
        if (state.scale && !isEqual(scale, state.scale)) {
            setScaleData(state.scale);
            toUpdate = true;
        }

        toUpdate && (key.current = Math.random());
    }, [state])

    const handlePositionChange = (pos) => {
        dispatch(setPosition(pos));
    }

    const handleRotationChange = (rot) => {
        dispatch(setRotation(rot));
    }

    const handleScaleChange = (sca) => {
        dispatch(setScale(sca));
    }

    if (!selectedMesh) {
        return null;
    }

    return (
        <div className="sidebar__sceneContents">
            <h4 className="sidebar__sceneHeader">Model Transformations</h4>
            <InputGroup
                type="position"
                defValue={{ x: position.x, y: position.y, z: position.z }}
                callback={handlePositionChange}
                key={key.current * Math.random()}
            />
            <InputGroup
                type="rotation"
                defValue={{ x: rotation.x, y: rotation.y, z: rotation.z }}
                callback={handleRotationChange}
                key={key.current * Math.random()}
            />
            <InputGroup
                type="scale"
                defValue={{ x: scale.x, y: scale.y, z: scale.z }}
                callback={handleScaleChange}
                key={key.current * Math.random()}
            />
        </div>
    )
}

export default SceneTransformations;