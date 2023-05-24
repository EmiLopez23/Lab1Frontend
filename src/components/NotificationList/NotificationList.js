import Notification from "./Notification"
import "./Notifications.css"

export default function NotificationList(){

    return <div className="notifications-container rounded-1 text-light">
        <Notification message={"Pepito wants to trade with you"} />
        <Notification message={"Pepito wants to trade with you"} />
        <Notification message={"Pepito wants to trade with you"} />
    </div>
}