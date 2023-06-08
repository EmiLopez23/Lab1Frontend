import "./SideBar.css"

export default function SideBar({username}){
    return <div className="sidebar-container text-light">
        <h2 className="sidebar-username">{username}</h2>
        <div className="sidebar-chats">
            
        </div>
    </div>
}