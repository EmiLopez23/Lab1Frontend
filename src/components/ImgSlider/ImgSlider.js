import ItemImg from "../ItemImage/ItemImg";
import ItemImgWithQty from "../ItemImage/ItemImgWithQty";

export default function ImgSlider({itemsArray, hasQty=false}){
    return <div className="items">
    {itemsArray.map((itemDta,index)=>hasQty 
                ? <ItemImgWithQty key={index} width={100} data={itemDta}/> 
                : <ItemImg key={index} width={100} item={itemDta}/>)}
    </div>
}