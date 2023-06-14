import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Notifications.css"

export default function Notification({message,onClick,icon,color}){
    return <div className="individual-notification rounded-1" onClick={onClick} style={{cursor:"pointer"}}>
        <div className="message">{message} <FontAwesomeIcon icon={icon} style={{color:color}}/></div>
    </div>
}