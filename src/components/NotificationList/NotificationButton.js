import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BubbleWrapper from "../NotiBubble/BubbleWrapper";
import { useContext, useEffect, useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {faBell as faBellRegular} from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import ApiService from "../../services/ApiService";
import NotificationList from "./NotificationList";

export default function NotificationButton(){
    const [showNoti,setShowNoti] = useState(false)
    const[notifications,setNotifications] = useState([])
    const {token} = useContext(UserContext) 

    useEffect(()=>{
        async function fetchInvites(){
            const data = await ApiService.getInvites(token)
            const newestFirst = data.reverse()
            setNotifications(newestFirst)
        }

        fetchInvites()
    },[token,showNoti])

    return <> 
    <BubbleWrapper element={<FontAwesomeIcon icon={showNoti ? faBell : faBellRegular} className=" notification-icon btn btn-secondary"/>} onClick={()=>setShowNoti(!showNoti)} notifications={notifications}/>
    {showNoti && <NotificationList notifications={notifications}/>}
    </>
}