import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Post.css"
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import ImgSlider from "../ImgSlider/ImgSlider";

export default function Post({trade}){
    

    return <div className="post-card rounded-1 text-secondary p-3">
        <div className="post-header mb-2 px-2 pb-2">
            <div className="username fs-5">{trade.username}</div>
            <div className="gameName fs-6">{trade.gameName}</div>
        </div>
        <div className="post-main">
            <div>
                <div className="mb-2">Offered</div>
                <ImgSlider itemsArray={trade.offered} hasQty={true}/>
            </div>
            <div className="text-light trade-btn-container">
                <FontAwesomeIcon icon={faRotate} className="trade-icon"/>
            </div>
            <div>
                <div className="mb-2">Wanted</div>
                <ImgSlider itemsArray={trade.wanted} hasQty={true}/>
            </div>
        
        </div>
    </div>
}