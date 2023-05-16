import { useContext, useEffect, useState } from "react"
import "./CreatePost.css"
import OfferItems from "./OfferItems"
import WantedItems from "./WantedItems"
import { UserContext } from "../../contexts/UserContext"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




export default function CreatePost(){
    const{token} = useContext(UserContext)
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

    function transformObject(list){
        return list.map((item) => ({
            id: parseInt(item.id),
            qty: parseInt(item.qty),
          }));
    }

    function handleSubmit(){
        const postObject = {"gameName":activeGame,
                            "offeredItems":transformObject(offeredItems),
                            "wantedItems":transformObject(wantedItems)}
        console.log(postObject)
        fetch("http://localhost:8080/post/create-post",{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body:JSON.stringify(postObject),
        })
        .then(resp=>
            {if(resp.ok){
                console.log("created")
            }
            else{
                console.log("error")
            }
        })
    }

    return <div className="create-post-card p-5">
        <select className="form-select mb-3" onChange={(e)=>setActiveGame(e.target.value)}>
                <option>Select a game...</option>
                {games?.map((game,index) => <option value={game.name} key={index}>{game.name}</option>)}
            </select>
        <div className="create-post-grid mb-3">
            <OfferItems gameName={activeGame} offeredItems={offeredItems} setOfferedItems={setOfferedItems}/>
            <WantedItems gameName={activeGame} wantedItems={wantedItems} setWantedItems={setWantedItems}/>
        </div>
        <div className="btn-container">
            <button className="btn btn-violet" onClick={handleSubmit} disabled={(offeredItems.length === 0 || wantedItems.length === 0)}><FontAwesomeIcon icon={faRepeat} /> Post Trade</button>
        </div>
    </div>

}