import { useContext, useState } from "react";
import Chat from "./Chat";
import "./ChatRoom.css"
import SideBar from "./SideBar";
import { UserContext } from "../../contexts/UserContext";

export default function ChatRoom(){
    const {username,id,token} = useContext(UserContext)
    const [receiverId,setReceiverId] = useState(null)
    const [receiverUsername,setReceiverUsername] = useState(null)
    return <div className="chat-room-container">
        <SideBar username={username} token={token} id={receiverId} setReceiverId={setReceiverId} setReceiverUsername={setReceiverUsername}/>
        <Chat username={username} senderId={id} receiverId={receiverId} receiverUsername={receiverUsername}/>
    </div>
}