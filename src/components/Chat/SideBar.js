import "./SideBar.css"

export default function SideBar({username}){
    return <div className="sidebar-container text-light">
        <div className="sidebar-username fs-3">{username}</div>
        <div className="sidebar-chats">
            
        </div>
    </div>
}