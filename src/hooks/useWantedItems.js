import { useContext } from "react";
import { CreatePostContext } from "../contexts/CreatePostContext";

export default function useWantedItems(){
    const {wantedItems, setWantedItems} = useContext(CreatePostContext)

    /* Filters the array to delete the item */
    function deleteItem(item){
        setWantedItems(prevState=>prevState.filter(i=>i.id !== item.id))
    }

    /* If item doesn´t exists push to array, else udpdate qty and array */
    function addItem(item){
        const index = wantedItems.findIndex(i => i.id === item.id)
        if(index>=0){
            const newOfferedItems = structuredClone(wantedItems)
            newOfferedItems[index].qty += 1
            setWantedItems(newOfferedItems)
        }
        else{
            item.qty=1
            setWantedItems([...wantedItems,item])
        }
    }

    
    return {wantedItems,setWantedItems,deleteItem,addItem}
}