import "./Messages.css"

export default function OtherMessage({sender,message}){
    return <div className="other-message-div">
        <div className="other-message-container">
            <h6 className="other-message-sender mb-0">{sender}</h6>
            {message}
        </div>
    </div>
}