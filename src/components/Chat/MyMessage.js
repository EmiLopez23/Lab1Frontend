import "./Messages.css"
export default function MyMessage({sender,message}){
    return <div className="my-message-div">
        <div className="my-message-container">
            <p className="my-message-sender mb-0">{sender}</p>
            <h5 className="my-message mb-0">{message}</h5>
        </div>
    </div>

}