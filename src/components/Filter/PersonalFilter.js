import { useEffect, useState } from "react"

export default function PersonalFilter({setFilteredItems,allItems}){
    const[games,setGames]=useState([])
    const[activeGame,setActiveGame]=useState("")

    /*Tuve que hacer dos componenentes distintos porque un filtro es para items y otro para User Items */
    /*Call the API to get all games */
    useEffect(()=>{
        fetch("http://localhost:8080/games/all")
        .then(resp=>resp.json())
        .then(data=>{
            setGames(data)
             })
        },[])
    
    /*Every time activeGame changes it triggers this UseEffect to filter the items */
    useEffect(()=>{
        (activeGame==="") 
        
        ? setFilteredItems(allItems)
        
        : setFilteredItems(allItems.filter((itemData)=>itemData.item.game.name === activeGame))
    },[activeGame,allItems,setFilteredItems])



    return(
        <div className="d-flex justify-content-end p-3">
            <select className="form-select" style={{width:160}} onChange={(e)=>setActiveGame(e.target.value)}>
                <option value={""}>All</option>
                {games?.map((game,index) => <option value={game.name} key={index}>{game.name}</option>)}
            </select>
        </div>
    )
}