import { useEffect, useState } from "react"
import "./CreatePost.css"
import OfferItems from "./OfferItems"
import WantedItems from "./WantedItems"




export default function CreatePost(){
    const [games,setGames] = useState([])
    const [activeGame,setActiveGame]=useState("")
    const [offeredItems,setOfferedItems] = useState([])
    const [wantedItems,setWantedItems] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/games/all")
        .then(resp=>resp.json())
        .then(data=>{
            setGames(data)
             })
        },[])

    function printResult(){
        const offer = offeredItems.map((item) => ({
            id: item.id,
            qty: item.qty,
          }));
          console.log(offer)
        const wanted = wantedItems.map((item) => ({
            id: item.id,
            qty: item.qty,
          }));
          console.log(wanted)
    }

    return <div className="create-post-card p-3">
        <select className="form-select mb-5" onChange={(e)=>setActiveGame(e.target.value)}>
                <option>Select a game...</option>
                {games?.map((game,index) => <option value={game.name} key={index}>{game.name}</option>)}
            </select>
        <div className="create-post-grid">
            <OfferItems gameName={activeGame} offeredItems={offeredItems} setOfferedItems={setOfferedItems}/>
            <WantedItems gameName={activeGame} wantedItems={wantedItems} setWantedItems={setWantedItems}/>
        </div>
        <button className="btn btn-success" onClick={()=>printResult()}>Post trade</button>
    </div>

}