import { useEffect, useState } from "react";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";

export default function AdminChat({senderId,receiverId,className}){
    const [messages,setMessages] = useState([])
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
            setMessages(chatMessages.sort((messageA, messageB) => new Date(messageA.timeStamp) - new Date(messageB.timeStamp)))
          })
          .catch(error => {
            console.error(error)
          });
        }
    )


    return <div className={`chat-messages ${className}`}>
        {messages.length 
        ? messages.map((message,index) => (
              message.senderId === senderId
                ? <MyMessage sender={message.sender} message={message.content} key={index}/>
                : <OtherMessage sender={message.sender} message={message.content} key={index}/>
            ))
        : "No messages between users"
        }
    </div>

}