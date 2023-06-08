import "./Messages.css"
export default function MyMessage({sender,message}){
    return <div className="my-message-div">
        <div className="my-message-container">
            <h6 className="my-message-sender mb-0">{sender}</h6>
            {message}
        </div>
    </div>

}