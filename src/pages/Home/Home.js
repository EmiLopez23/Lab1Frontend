import { useContext, useEffect, useState } from "react"
import Post from "../../components/PostCard/Post"
import "./Home.css"
import { UserContext } from "../../contexts/UserContext"

export default function Home(){
    const [trades,setTrades] =useState([])
    const{token} = useContext(UserContext)

    useEffect(()=>{
        fetch("http://localhost:8080/post/all", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            let dataToReturn = []
            data.forEach(dataTrade => {
                dataToReturn=[...dataToReturn,
                    {
                        gameName:dataTrade.game.name,
                        username:dataTrade.user.username,
                        offered:dataTrade.tradeItems.filter(t=>t.tradeDirection==='OFFERED'),
                        wanted:dataTrade.tradeItems.filter(t=>t.tradeDirection==='WANTED')
                    }]
            })
            setTrades(dataToReturn);
        })
    },[token])

    return <div className="home mt-4 p-3">
            <h4 className="text-light">Latest Posts</h4>
            <div>
                {trades.map((trade,index)=><Post key={index} trade={trade}/>)}
            </div>
            </div>
}