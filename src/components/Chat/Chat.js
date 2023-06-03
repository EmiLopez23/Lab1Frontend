import { useContext, useEffect } from "react";
import { useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";

export default function Chat() {
    const {id:senderId,username} = useContext(UserContext)
    const {receiverId} = useParams()
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      const socket = new SockJS('http://localhost:8080/ws');
      const stomp = over(socket);
  
      stomp.connect({}, () => {
        setStompClient(stomp);
        setIsConnected(true);
      });
  
      return () => {
        if (stompClient) {
          stompClient.disconnect();
          setIsConnected(false);
        }
      };
    },[]);
  
    useEffect(() => {
      fetch(`http://localhost:8080/messages/${senderId}/${receiverId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los mensajes del chat');
        }
      })
      .then(chatMessages => {
        console.log(chatMessages)
        setMessages(chatMessages.sort((messageA, messageB) => new Date(messageA.timeStamp) - new Date(messageB.timeStamp)))
      })
      .catch(error => {
        console.error(error)
      });
      if (stompClient) {
        stompClient.subscribe(`/user/${username}/queue/messages`, handleReceivedMessage);
      }
    }, [stompClient,senderId,username,receiverId]);
  
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
  
    return (
      <div className="bg-light">
        <h2>Chat</h2>
        {messages.map((message,index) => (
          <div key={index}>
            {message.sender}: {message.content}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = e.target.elements.message.value;
            sendMessage(content);
            e.target.elements.message.value = '';
          }}
        >
          <input type="text" name="message" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
}