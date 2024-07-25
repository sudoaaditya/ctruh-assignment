import { useSelector } from "react-redux";
import SceneContents from "./Sidebar.Scene";
import SceneTransformations from "./Sidebar.Transformations";

const Sidebar = (props) => {

    const modelMesh = useSelector(state => state.experience.modelMesh);

    if (!modelMesh) {
        return null;
    }

    return (
        <div className="sidebar">
            <SceneContents />
            <SceneTransformations />
        </div>
    )
}

export default Sidebar;