

export default function ItemImg({item,width,onClick}){
    let style = {
        width:width, 
        height:"auto", 
        backgroundColor:"black",
        cursor: onClick ? "pointer" : "default"
    }

    return <div onClick={onClick}>
        <img 
            src={`http://localhost:8080/resources/${item.imgPath}`} 
            className="rounded-1 item-img" 
            style={style} 
            alt={item.name}
        />
    </div>
}