import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"

export default function Filter({setFilteredItems,allItems, myItems=false}){
    const[games,setGames]=useState([])
    const[activeGame,setActiveGame]=useState("")

    /*Call the API to get all games */
    useEffect(()=>{
        async function fetchGames(){
            try{
                const gamesFetched = await ApiService.getGames()
                const gamesNameList = Object.keys(gamesFetched)
                setGames(gamesNameList) 
            }catch(error){
                console.error(error)
            }
        } 
        fetchGames()
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
                {games?.map((game,index) => <option value={game} key={index}>{game}</option>)}
            </select>
        </div>
    )

}