import { useContext, useState } from "react";
import Chat from "./Chat";
import "./ChatRoom.css"
import SideBar from "./SideBar";
import { UserContext } from "../../contexts/UserContext";

export default function ChatRoom(){
    const {username,id,token} = useContext(UserContext)
    const [receiverId,setReceiverId] = useState(null)
    return <div className="chat-room-container">
        <SideBar username={username} token={token} id={receiverId} setReceiverId={setReceiverId}/>
        <Chat username={username} senderId={id} receiverId={receiverId}/>
    </div>
}