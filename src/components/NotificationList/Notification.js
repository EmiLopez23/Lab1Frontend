import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Notifications.css"
import { faArrowRightLong, faFaceFrown } from "@fortawesome/free-solid-svg-icons"

export default function Notification({message,onClick,empty=false}){
    return <div className="individual-notification rounded-1" onClick={onClick} style={{cursor:"pointer"}}>
        <div className="message">{message} <FontAwesomeIcon icon={!empty ? faArrowRightLong : faFaceFrown} style={{color:(!empty ? "blue" : "red")}}/></div>
    </div>
}