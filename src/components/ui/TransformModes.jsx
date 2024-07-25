import { useDispatch, useSelector } from "react-redux";

import { Move, RotateCw, Maximize2 } from 'react-feather';
import { changeTransformMode } from "../../features/experienceSlice";

const TransformButtons = (props) => {
    const dispatch = useDispatch();

    const modelMesh = useSelector(state => state.experience.modelMesh);
    const transformMode = useSelector(state => state.experience.transformMode);

    if (!modelMesh) {
        return null;
    }

    return (
        <div className="traformButtons">
            <div className={`traformButtons__button ${transformMode === 'translate' && "traformButtons__button__active"}`} onClick={() => dispatch(changeTransformMode("translate"))}>
                <Move size={18} />
            </div>
            <div className={`traformButtons__button ${transformMode === 'rotate' && "traformButtons__button__active"}`} onClick={() => dispatch(changeTransformMode("rotate"))}>
                <RotateCw size={18} />
            </div>
            <div className={`traformButtons__button ${transformMode === 'scale' && "traformButtons__button__active"}`} onClick={() => dispatch(changeTransformMode("scale"))}>
                <Maximize2 size={18} />
            </div>
        </div>
    )
}

export default TransformButtons;