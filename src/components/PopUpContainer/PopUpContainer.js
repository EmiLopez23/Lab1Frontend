import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PopupContainer.css"

export default function PopUpContainer({element,onClick}){
    return <div className="popup-container">
        <div className="form-card bg-dark position-absolute rounded-3 p-5">
        {element}
        <FontAwesomeIcon icon={faXmark} onClick={onClick} className="close-btn"/>
        </div>
    </div>
}