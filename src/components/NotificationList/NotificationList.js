import Notification from "./Notification"
import "./Notifications.css"
import { useNavigate } from "react-router-dom"
import { faArrowRightLong, faCircleCheck, faFaceFrown } from "@fortawesome/free-solid-svg-icons"

export default function NotificationList({notifications}){
    const navigate = useNavigate()


    return <div className={`notifications-container rounded-1 text-light`}>
        {notifications.length 
            ? notifications.map((noti,index)=>{
                return noti.accepted
                    ? <Notification key={index} message={`${noti.postResponse.username} accepted your invite`} icon={faCircleCheck} color={"green"}/>
                    : <Notification key={index} message={`${noti.requesterUsername} wants to trade with you`} onClick={()=>navigate(`/post-invite/${noti.tradeId}`)} icon={faArrowRightLong} color={"#8492db"}/>})
            : <Notification message={"Nothing yet"} icon={faFaceFrown} color={"#aa5353"}/>}
    </div>
}