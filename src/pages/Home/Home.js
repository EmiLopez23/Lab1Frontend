import { useContext, useEffect, useState } from "react"
import Post from "../../components/PostCard/Post"
import "./Home.css"
import { UserContext } from "../../contexts/UserContext"

export default function Home(){
    const [trades,setTrades] =useState([])
    const{token} = useContext(UserContext)
    const [searchPostInput, setSearchPost] = useState("")
    const [searchResults, setSearchResults] = useState([])

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
            setSearchResults(dataToReturn)
        })
    },[token])


    useEffect(()=>{
        (searchPostInput!=="")
            ? setSearchResults(searchPost(trades,searchPostInput))
            : setSearchResults(trades)
    },[searchPostInput,trades])

    return <div className="home mt-4 p-3">
            <input 
                placeholder="Search post..." 
                className="form-control w-25"
                onChange={(e)=>setSearchPost(e.target.value)}
            />
            <div 
                className="text-light" 
                style={{fontSize:"0.8rem", paddingLeft:5}}
                >
                    Note: you can search by username, item or game
                </div>
            
            <h4 className="text-light">Latest Posts</h4>
            <div>
                {searchResults.map((trade,index)=><Post key={index} trade={trade}/>)}
            </div>
            </div>
}


function searchPost(posts, search){
    const lowerCaseSearchTerm = search.toLowerCase()
    let filteredPosts = posts.filter(post=>{
        if (post.username.toLowerCase().includes(lowerCaseSearchTerm)) {
            return true;
        }

        // Buscar en el nombre del juego
        if (post.gameName.toLowerCase().includes(lowerCaseSearchTerm)) {
            return true;
        }

        // Buscar en los items ofrecidos
        for (let offeredItem of post.offered) {
            if (offeredItem.item.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
        }

        // Buscar en los items deseados
        for (let wantedItem of post.wanted) {
            if (wantedItem.item.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
        }

        // Si nada coincide, no incluir el post
        return false;
    })
    return filteredPosts
}