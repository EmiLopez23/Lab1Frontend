import { useContext, useEffect, useState } from "react"
import "./CreatePost.css"
import OfferItems from "./OfferItems"
import WantedItems from "./WantedItems"
import { UserContext } from "../../contexts/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ApiService from "../../services/ApiService"
import {toast } from "react-hot-toast"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import useOfferItems from "../../hooks/useOfferItems"
import useWantedItems from "../../hooks/useWantedItems"




export default function CreatePost(){
    const{token} = useContext(UserContext)
    const [games,setGames] = useState([])
    const [activeGame,setActiveGame]=useState("")
    const {offeredItems} = useOfferItems()
    const {wantedItems} = useWantedItems()
    const navigate = useNavigate()

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

    function handleSubmit(){
        const postObject = {"gameName":activeGame,
                            "offeredItems":offeredItems,
                            "wantedItems":wantedItems}
        
        fetch("http://localhost:8080/post/create-post",{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body:JSON.stringify(postObject),
        })
        .then(resp=>
            {if(!resp.ok){
                return resp.text().then((errMsg) => {throw new Error(errMsg)});
            }
            else{
                toast.success("Successfully created")
                navigate("/home")
            }
        })
        .catch(error=>toast.error(error.message))
    }

    return <>
    <div className="create-post-card p-5">
        <select className="form-select mb-3" onChange={(e)=>setActiveGame(e.target.value)}>
                <option>Select a game...</option> 
                {games?.map((game,index) => <option value={game} key={index}>{game}</option>)}
            </select>
        <div className="create-post-grid mb-3">
            <OfferItems gameName={activeGame}/>
            <WantedItems gameName={activeGame}/>
        </div>
        <div className="btn-container">
                <button className="btn btn-violet" onClick={handleSubmit} disabled={(offeredItems.length === 0 || wantedItems.length === 0)} ><FontAwesomeIcon icon={faRepeat} /> Post Trade</button>
        </div>
    </div>
    </>

}