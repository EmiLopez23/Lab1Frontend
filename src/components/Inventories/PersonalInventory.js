import { useContext, useEffect, useState } from "react"
import "./GeneralInventory.css"
import { UserContext } from "../../contexts/UserContext"
import ItemCard from "../ItemCard/ItemCard"
import Filter from "../Filter/Filter"
import ApiService from "../../services/ApiService"
import NoContent from "../NoContent/NoContent"

export default function PersonalInventory(){
    const {token} = useContext(UserContext)
    /*This array persist all the items in inventory */
    const [itemsData,setItemsData] = useState([])
    /*This array filter all the items in inventory */
    const [filteredItems, setFilteredItems] = useState([])

    /*Call the API to set all the items in general inventory.*/
    useEffect(()=>{
        async function fetchUserInventory(){
            try{
                const inventory = await ApiService.getUserInventory(token)
                setItemsData(inventory)
                setFilteredItems(inventory)
            }catch(error){
                console.error(error)
            }
        }
        fetchUserInventory()
    },[token])

    return (
        <div>
            <Filter allItems={itemsData} setFilteredItems={setFilteredItems} myItems={true}/>
            {filteredItems.length === 0
                ? <NoContent text={"No Items"} height={"50vh"}/>
                : <div className="inventory-container py-3">{filteredItems.map((data, index)=><ItemCard item={data} key={index} hasQty={true}/>)}</div>}
        </div>)
}