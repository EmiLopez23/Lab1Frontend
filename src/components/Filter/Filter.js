import { useEffect, useState } from "react"

export default function Filter({setFilteredItems,allItems}){
    const[games,setGames]=useState([])
    const[activeGame,setActiveGame]=useState("")

    useEffect(()=>{
        if(activeGame==="") setFilteredItems(allItems)
        else{
            setFilteredItems(allItems.filter((item)=>item.game.name === activeGame))
        }
    },[activeGame])

    useEffect(()=>{
        fetch("http://localhost:8080/games/all")
        .then(resp=>resp.json())
        .then(data=>{
            setGames(data)
             })
        },[])


    return(
        <div className="d-flex justify-content-end p-3">
            <select className="form-select" style={{width:160}} onChange={(e)=>setActiveGame(e.target.value)}>
                <option value={""}>All</option>
                {games?.map((game,index) => <option value={game.name} key={index}>{game.name}</option>)}
            </select>
        </div>
    )

}