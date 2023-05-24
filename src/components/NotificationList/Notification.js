import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Notification({message}){
    return <div className="individual-notification rounded-1">
        <div className="message">{message}</div>
        <div className="notification-btn-container">
            <button className="notificacion-btn"><FontAwesomeIcon icon={faComment} className="chat-btn" /></button>
            <button className="notificacion-btn"><FontAwesomeIcon icon={faCheck} className="accept-btn"/></button>
            <button className="notificacion-btn"><FontAwesomeIcon icon={faXmark} className="close-btn" /></button>
        </div>
    </div>
}