import { useContext } from "react";
import Chat from "./Chat";
import "./ChatRoom.css"
import SideBar from "./SideBar";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";

export default function ChatRoom(){
    const {username,id,token} = useContext(UserContext)
    const {receiverId} = useParams()
    return <div className="chat-room-container">
        <SideBar username={username} token={token} id={receiverId}/>
        <Chat username={username} senderId={id} receiverId={receiverId}/>
    </div>
}