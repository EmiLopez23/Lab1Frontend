import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { UserContext } from "../../contexts/UserContext"
import Post from "../PostCard/Post"

export default function Profile(){
    const {username} = useParams()
    const {token} = useContext(UserContext)
    const [trades,setTrades] = useState([])
    const [inventory,setInventory] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const posts = await ApiService.getPosts(token);
            const filteredPosts = posts.filter(post=>post.username===username).reverse()
            setTrades(filteredPosts);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPosts();
      }, [token,username]);
    return <div className="text-light">
        <h1>{username}</h1>
        <div className="user-page-body">
            <div className="user-posts">
                {trades?.map((trade,index)=><Post trade={trade} key={index} token={token}/>)}
            </div>
            <div className="user-inventory">

            </div>
        </div>
        
        
    </div>
}