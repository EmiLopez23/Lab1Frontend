import "./BubbleWrapper.css"

export default function BubbleWrapper({notifications,onClick,element}){
    return <div style={{position:"relative", cursor:"pointer"}} onClick={onClick}>
    {notifications.length !== 0 && <div className="notification-bubble"></div>}
    {element}
  </div>
}