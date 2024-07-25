import { useDispatch, useSelector } from "react-redux";
import { Box } from 'react-feather';
import { setSelectedMesh } from "../../../features/experienceSlice";

const SceneContents = () => {
    const dispatch = useDispatch();
    const modelMesh = useSelector(state => state.experience.modelMesh);
    const selectedMesh = useSelector(state => state.experience.selectedMesh);

    const handleClick = (object) => {
        dispatch(setSelectedMesh(object));
    }

    const renderMeshItem = () => {
        const uiList = [];

        const getUIElement = (object, padValue) => {
            return (
                <div
                    id={object.uuid}
                    className={`sidebar__sceneItem ${object.uuid === selectedMesh?.uuid ? "sidebar__sceneItem__active" : ""}`}
                    style={{ paddingLeft: `${padValue * 4}px` }}
                    key={object.uuid}
                    onClick={() => handleClick(object)}
                >
                    <Box size={12} />
                    <span>{object.name.length ? object.name : object.uuid}</span>
                </div>
            )
        }

        const addObject = (objects, padding) => {
            objects.forEach(object => {
                uiList.push(getUIElement(object, padding));
                if (object?.children?.length) {
                    addObject(object.children, padding + 4)
                }
            })
        }
        addObject(modelMesh.children || [], 1);
        return uiList;
    }

    return (
        <div className="sidebar__sceneContents">
            <h4 className="sidebar__sceneHeader">Model Hierarchy</h4>
            {renderMeshItem()}
        </div>
    )
}

export default SceneContents;