import "./Notifications.css"

export default function Notification({message,onClick}){
    return <div className="individual-notification rounded-1" onClick={onClick} style={{cursor:"pointer"}}>
        <div className="message">{message}</div>
    </div>
}