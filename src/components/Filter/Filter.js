import { useEffect, useState } from "react"

export default function Filter({setFilteredItems,allItems, myItems=false}){
    const[games,setGames]=useState([])
    const[activeGame,setActiveGame]=useState("")

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
        
        : setFilteredItems(allItems.filter((itemDta)=>(myItems ? itemDta.item : itemDta).game.name === activeGame))

    },[activeGame, allItems, setFilteredItems, myItems])

    


    return(
        <div className="d-flex pt-4">
            <select className="form-select" style={{width:160}} onChange={(e)=>setActiveGame(e.target.value)}>
                <option value={""}>All</option>
                {games?.map((game,index) => <option value={game.name} key={index}>{game.name}</option>)}
            </select>
        </div>
    )

}