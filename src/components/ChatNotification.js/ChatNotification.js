import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { UserContext } from "../../contexts/UserContext";
import BubbleWrapper from "../NotiBubble/BubbleWrapper";

export default function ChatNotification({onClick}){
    const {username} = useContext(UserContext)
    const [stompClient, setStompClient] = useState(null);
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
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
    },[]);
  
    useEffect(() => {
      if (stompClient) {
        stompClient.subscribe(`/user/${username}/queue/notifications`, handleReceivedMessage);
      }
    }, [stompClient,username]);
  
    const handleReceivedMessage = (message) => {
      const notification = JSON.parse(message.body);
      setNotifications((prevNoti) => [...prevNoti, notification]);
    };

    return <BubbleWrapper element={<FontAwesomeIcon icon={faMessage} className="notification-icon btn btn-secondary"/>} notifications={notifications} onClick={onClick}/>
    
    
}