import { useRef } from "react"
import { Euler, MathUtils, Vector3 } from "three";

const InputGroup = ({ type, defValue, callback, rangeMin, rangeMax }) => {

    const formRef = useRef(null);
    const refX = useRef(null);
    const refY = useRef(null);
    const refZ = useRef(null);

    const handleFormChange = () => {
        if (type === "position" || type === "scale") {
            callback(new Vector3(Number(refX.current.value), Number(refY.current.value), Number(refZ.current.value)))
        } else if (type === "rotation") {
            callback(new Euler(Number(refX.current.value) * MathUtils.DEG2RAD, Number(refY.current.value) * MathUtils.DEG2RAD, Number(refZ.current.value) * MathUtils.DEG2RAD))
        }
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <div className="sidebar__inputHeader">{type}</div>
            <form ref={formRef} key={type} className="sidebar__inputRow">
                <div className="sidebar__numberCont">
                    <label htmlFor={`${type}X`}>X</label>
                    <input
                        type="number"
                        id={`${type}X`}
                        ref={refX}
                        defaultValue={defValue.x}
                        step={0.1}
                        min={rangeMin || Infinity}
                        max={rangeMax || Infinity}
                        onKeyDown={(e) => e.key === 'Enter' && handleFormChange()}
                        onBlur={() => handleFormChange()}
                    />
                </div>

                <div className="sidebar__numberCont">
                    <label htmlFor={`${type}Y`}>Y</label>
                    <input
                        type="number"
                        id={`${type}Y`}
                        ref={refY}
                        defaultValue={defValue.y}
                        step={0.1}
                        min={rangeMin || Infinity}
                        max={rangeMax || Infinity}
                        onKeyDown={(e) => e.key === 'Enter' && handleFormChange()}
                        onBlur={() => handleFormChange()}
                    />
                </div>


                <div className="sidebar__numberCont">
                    <label htmlFor={`${type}Z`}>Z</label>
                    <input
                        type="number"
                        id={`${type}Z`}
                        ref={refZ}
                        defaultValue={defValue.z}
                        step={0.1}
                        min={rangeMin || Infinity}
                        max={rangeMax || Infinity}
                        onKeyDown={(e) => e.key === 'Enter' && handleFormChange()}
                        onBlur={() => handleFormChange()}
                    />
                </div>

            </form>
        </div>

    )
}

export default InputGroup;