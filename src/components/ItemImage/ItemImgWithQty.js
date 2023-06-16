import ItemImg from "./ItemImg"
import "./ItemImg.css"

export default function ItemImgWithQty({data,width,onClick}){
    return <div className="personal-items-container">
    <div className="personal-item-qty">{data.quantity}</div>
    <ItemImg item={data.item} width={width} onClick={onClick}/>
    </div>
}