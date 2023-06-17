import { useEffect, useRef } from "react";
import { useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";
import "./Messages.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Chat({username,senderId,receiverId,receiverUsername}) {
    const lastMessageRef = useRef(null)
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [message,setMessage] = useState("")
  
    useEffect(() => {
      let stomp = null;

      const connectToWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stomp = over(socket);
      
        stomp.connect({}, () => {
          setStompClient(stomp);
          setIsConnected(true);
        });
      };
    
      const disconnectFromWebSocket = () => {
        if (stomp) {
          stomp.disconnect();
          setIsConnected(false);
        }
      };
    
      connectToWebSocket();
    
      return disconnectFromWebSocket;
    },[]);
    
  
    useEffect(() => {
      if(receiverId!==null){
        fetch(`http://localhost:8080/messages/${senderId}/${receiverId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener los mensajes del chat');
          }
        })
        .then(chatMessages => {
          setMessages(chatMessages.sort((messageA, messageB) => new Date(messageA.timeStamp) - new Date(messageB.timeStamp)))
        })
        .catch(error => {
          console.error(error)
        });
        if (stompClient) {
          stompClient.subscribe(`/user/${username}/queue/messages`, handleReceivedMessage);
        }
      }
      
    }, [stompClient,senderId,username,receiverId]);

    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleReceivedMessage = (message) => {
      const chatMessage = JSON.parse(message.body);
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    };
  
    const sendMessage = (content) => {
        if (isConnected) {
          const chatMessage = {
              content: content,
              timeStamp: new Date()
            };
        
            const headers = {
              senderId: senderId,
              receiverId: receiverId,
            };
            stompClient.send('/app/chat', headers, JSON.stringify(chatMessage));
          
            const chatMessagetoAdd = {
              ...chatMessage,
              sender: username
            };
      
            setMessages(prevMessages => [...prevMessages, chatMessagetoAdd]);
        }
      };

    function handleMessage(event){
      event.preventDefault();
      sendMessage(message);
      setMessage("")
      scrollToBottom()
    }

    function scrollToBottom(){
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    };
  
    return (
      <div className="bg-dark chat-container">
        <h4 className="text-light chat-title mb-0">{receiverUsername ? receiverUsername : "Chat"}</h4>
        <div className="chat-messages">
        {messages.filter(m=>m.sender === receiverUsername || m.sender === username).map((message,index) => (
          message.sender === username
            ? <MyMessage sender={"You"} message={message.content} key={index}/>
            : <OtherMessage sender={message.sender} message={message.content} key={index}/>
        ))}
        <div ref={lastMessageRef}/>
        </div>
        {receiverUsername && <form onSubmit={handleMessage} className="message-form">
          <input type="text" name="message" className="form-control" onChange={e=>{setMessage(e.target.value);console.log(messages)}} value={message}/>
          <button type="submit" className="btn btn-violet"><FontAwesomeIcon icon={faArrowRight} /></button>
        </form>}
      </div>
    );
}