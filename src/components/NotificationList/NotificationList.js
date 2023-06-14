import { useContext, useEffect, useState } from "react"
import Notification from "./Notification"
import "./Notifications.css"
import { UserContext } from "../../contexts/UserContext"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"
import { faArrowRightLong, faCircleCheck, faFaceFrown } from "@fortawesome/free-solid-svg-icons"

export default function NotificationList(){
    const {token} = useContext(UserContext)
    const[notifications,setNotifications] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchInvites(){
            const data = await ApiService.getInvites(token)
            const newestFirst = data.reverse()
            setNotifications(newestFirst)
        }

        fetchInvites()
    },[token])


    return <div className={`notifications-container rounded-1 text-light`}>
        {notifications.length 
            ? notifications.map((noti,index)=>{
                return noti.accepted
                    ? <Notification key={index} message={`${noti.postResponse.username} accepted your invite`} icon={faCircleCheck} color={"green"}/>
                    : <Notification key={index} message={`${noti.requesterUsername} wants to trade with you`} onClick={()=>navigate(`/post-invite/${noti.tradeId}`)} icon={faArrowRightLong} color={"#8492db"}/>})
            : <Notification message={"Nothing yet"} icon={faFaceFrown} color={"#aa5353"}/>}
    </div>
}