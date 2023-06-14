import { useEffect, useState } from "react"
import "./SideBar.css"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import SockJS from "sockjs-client"
import { over } from "stompjs"

export default function SideBar({username,token, id}){
    const [contacts,setContacts] = useState([])
    const [notification,setNotifications] = useState({})
    const [stompClient, setStompClient] = useState(null);
    const navigate = useNavigate()

    useEffect(()=>{
        let stomp = null;

      const connectToWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stomp = over(socket);
      
        stomp.connect({}, () => {
          setStompClient(stomp);
        });
      };
    
      const disconnectFromWebSocket = () => {
        if (stomp) {
          stomp.disconnect();
        }
      };
    
      connectToWebSocket();
    
      return disconnectFromWebSocket;
    },[])

    useEffect(()=>{
        async function fetchContacts(){
            try{
                const contacts = await ApiService.getContacts(token)
                const c = contacts?.map(contact=>contact={id:contact.id,username:contact.username})
                setContacts(c)
            }catch(error){
                console.log(error)
            }
        }
        fetchContacts()
        if (stompClient) {
            stompClient.subscribe(`/user/${username}/queue/notifications`, handleReceivedMessage);
          }
    },[token,stompClient,username])

    const handleReceivedMessage = (message) => {
        const notification = JSON.parse(message.body);
        setNotifications(notification);
      };


    return <div className="sidebar-container text-light">
        <div className="sidebar-username">
            <h4 className="m-0">{username}</h4>
            <button className="home-btn" onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHouse} size="xs" /></button>    
        </div>

        <div className="sidebar-chats">
            {contacts?.map((contact,index)=><div className={`contact ${parseInt(id)===contact.id ? "active" : ""}`} key={index} onClick={()=>{navigate(`/chat/${contact.id}`);setNotifications(null)}}>
                                            {contact.username}
                                            {notification?.senderUsername === contact.username && <div className="in-chat notification-bubble"></div>}
                                            </div>)}
        </div>
    </div>
}