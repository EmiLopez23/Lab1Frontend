import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Post.css"
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import ImgSlider from "../ImgSlider/ImgSlider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Post({trade,token, canTrade=true, requester=null}){
    const navigate = useNavigate()

    function createInvite(){
            fetch(`http://localhost:8080/post/create-invite/${trade.id}`,
                {   method:"POST",
                    headers:{
                    Authorization:`Bearer ${token}`}
                })
            .then(resp=>{
                resp.ok 
                    ? toast.success(`Invite succesfuly sent to ${trade.username}`)
                    : toast.error('error sending invite')
            })
            
            
    }

    return <div className="post-card rounded-1 text-secondary p-3">
        <div className="post-header mb-2 px-2 pb-2">
            <div className="username fs-5" onClick={()=>navigate(`/user/${trade.username}`)}>{trade.username}</div>
            {requester
             ?<div className="username fs-5" onClick={()=>navigate(`/user/${trade.username}`)}>{requester}</div>
             :<div className="gameName fs-6">{trade.gameName}</div>}
        </div>
        <div className="post-main">
            <div>
                <div className="mb-2">Offered</div>
                <ImgSlider itemsArray={trade.offered} hasQty={true}/>
            </div>
            <div className="text-light trade-btn-container">
                {canTrade &&  <FontAwesomeIcon icon={faRotate} className="trade-icon" style={{cursor:"pointer"}} onClick={createInvite}/>}
            </div>
            <div>
                <div className="mb-2">Wanted</div>
                <ImgSlider itemsArray={trade.wanted} hasQty={true}/>
            </div>
        
        </div>
    </div>
}