import "./Messages.css"

export default function OtherMessage({sender,message}){
    return <div className="other-message-div">
        <div className="other-message-container">
            <p className="other-message-sender mb-0">{sender}</p>
            <h5 className="other-message mb-0">{message}</h5>
        </div>
    </div>
}