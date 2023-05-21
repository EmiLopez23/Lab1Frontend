

export default function ItemImg({item,width,onClick}){
    return <div onClick={onClick}>
        <img src={`http://localhost:8080/resources/${item.imgPath}`} className="rounded-1 item-img" style={{width:width, height:"auto", backgroundColor:"black"}} alt={item.name}></img>
    </div>
}