import { useContext } from "react";
import { CreatePostContext } from "../contexts/CreatePostContext";

export default function useOfferItems(){
    const {offeredItems, setOfferedItems} = useContext(CreatePostContext)

    /* Filters the array to delete the item */
    function deleteItem(item){
        setOfferedItems(prevState=>prevState.filter(i=>i.id !== item.id))
    }

    /* If item doesn´t exists push to array, else udpdate qty and array */
    function addItem(item,availableQty){
        const index = offeredItems.findIndex(i => i.id === item.id)
        if(index>=0){
            if(offeredItems[index].qty < availableQty){
            const newOfferedItems = structuredClone(offeredItems)
            newOfferedItems[index].qty += 1
            setOfferedItems(newOfferedItems)
            }
        }
        else{
            item.qty=1
            setOfferedItems([...offeredItems,item])
        }
    }

    
    return {offeredItems,setOfferedItems,deleteItem,addItem}
}