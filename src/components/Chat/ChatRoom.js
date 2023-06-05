import { useContext } from "react";
import Chat from "./Chat";
import "./ChatRoom.css"
import SideBar from "./SideBar";
import { UserContext } from "../../contexts/UserContext";

export default function ChatRoom(){
    const {username,id} = useContext(UserContext)
    return <div className="chat-room-container">
        <SideBar username={username}/>
        <Chat username={username} senderId={id}/>
    </div>
}