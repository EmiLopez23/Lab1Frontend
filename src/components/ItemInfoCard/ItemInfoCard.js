import { useEffect } from "react"
import "./ItemInfoCard.css"


export default function ItemInfoCard({item}){
    useEffect(()=>{
        console.log(item.categoryValues)
    })

    return(
        <>
            <div className="form-card d-flex bg-dark item-info-container rounded-1">
                <div className="item-img">
                    <img src={`http://localhost:8080/${item.imgPath}`} className="rounded-1 item-info-img" alt={item.name}/>
                </div>
                <div className="text-light">
                    <div>
                        <h6>Item Name: </h6>
                        <p className="fs-3">{item.name}</p>
                    </div>
                    <div>
                        <h6>Categories: </h6>
                        <div className="categories">
                        {item.categoryValues.map(category=><div className="category-div" key={category.value}>{category.value}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}