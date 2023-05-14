import { useContext, useState } from "react"
import "./ItemInfoCard.css"
import { UserContext } from "../../contexts/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck,faCircleXmark } from "@fortawesome/free-solid-svg-icons"


export default function ItemInfoCard({item}){
    const {token} = useContext(UserContext)
    const [qty, setQty] = useState(null)
    const [AddStep,setAddStep] = useState(0)

    function handleSubmit(event){
        event.preventDefault()
        setAddStep(1)
        fetch("http://localhost:8080/user/inventory/addItem",{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({itemId: item.id,quantity: qty})
        }).then(resp=>{
            if(resp.ok){console.log(resp)}
            else{
                throw new Error("Error")
            }
        }).finally(()=>{
            setAddStep(2)
        }).catch(()=>{
            setAddStep(3)
        })
    }

    function handleLoading(AddStep){
        switch(AddStep){
            case 0:
                return <button className="btn btn-violet text-light w-100" onClick={handleSubmit}>Add</button>
            case 1:
                return <div className="my-spinner text-violet"></div>
            case 2:
                return <FontAwesomeIcon icon={faCircleCheck} className="text-success fs-2" />
            case 3:
                return <FontAwesomeIcon icon={faCircleXmark} className="text-danger fs-2" />
            default:
                return setAddStep(0)
        
    }
}

    return(
        <>
            <div className="d-flex item-info-container rounded-1">
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
                        {item.categoryValues.map(category=><div className="category-div" key={category.id}>{category.value}</div>)}
                        </div>
                    </div>
                </div>
            </div>
                <div className="add-to-inventory-container mt-4">
                <div className="add-to-inventory-input">
                    <input type="number" className="form-control" name="quantity" placeholder="Quantity" min={1} onChange={(e)=>{setQty(e.target.value); setAddStep(0)}} required/>
                </div>
                <div className="add-to-inventory-btn">
                    {handleLoading(AddStep)}
                </div>
                
                
            </div>
        </>
    )
}