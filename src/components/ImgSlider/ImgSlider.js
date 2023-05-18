import ItemImg from "../ItemCard/ItemImg";

export default function ImgSlider({items}){
    return <div className="items">
    {items.map((item,index)=><ItemImg key={index} width={100} item={item}/>)}
    </div>
}