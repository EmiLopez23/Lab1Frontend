import { useContext, useEffect, useState } from "react"
import Notification from "./Notification"
import "./Notifications.css"
import { UserContext } from "../../contexts/UserContext"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"

export default function NotificationList(){
    const {token} = useContext(UserContext)
    const[invites,setInvites] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchInvites(){
            const data = await ApiService.getInvites(token)
            const filtered = data.filter(trade=> !trade.accepted)
            setInvites(filtered)
        }

        fetchInvites()
    },[token])


    return <div className={`notifications-container rounded-1 text-light`}>
        {invites.length 
            ? invites.map((invite,index)=><Notification key={index} message={`${invite.requesterUsername} wants to trade with you`} onClick={()=>navigate(`/post-invite/${invite.tradeId}`)}/>)
            : <Notification message={"Nothing yet"} empty={true}/>}
    </div>
}