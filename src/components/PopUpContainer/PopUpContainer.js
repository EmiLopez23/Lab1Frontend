import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PopupContainer.css"

export default function PopUpContainer({element,onClick}){
    return <div className="popup-container">
        {element}
        <FontAwesomeIcon icon={faXmark} onClick={onClick} className="close-btn"/>
    </div>
}