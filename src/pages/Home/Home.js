import { useContext, useEffect, useState } from "react"
import Post from "../../components/PostCard/Post"
import "./Home.css"
import { UserContext } from "../../contexts/UserContext"
import ApiService from "../../services/ApiService"
import { Toaster } from "react-hot-toast"

export default function Home(){
    const [trades,setTrades] =useState([])
    const{token,username} = useContext(UserContext)
    const [searchPostInput, setSearchPost] = useState("")
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const posts = await ApiService.getPosts(token);
            const filteredPosts = posts.filter(post=>post.username!==username).reverse()
            setTrades(filteredPosts);
            setSearchResults(filteredPosts);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPosts();
      }, [token,username]);

    /*Updates the array eery time user changes the input value*/  
    useEffect(()=>{
        (searchPostInput!=="")
            ? setSearchResults(searchPost(trades,searchPostInput))
            : setSearchResults(trades)
    },[searchPostInput,trades])

    return <div className="home mt-4 p-3">
            <Toaster position="top-center" toastOptions={{duration: 3000,style: {background: '#333',color: '#fff',}}}/>
            <div className="search-post-container">
                <input placeholder="Search post..." className="form-control search-post" onChange={(e)=>setSearchPost(e.target.value)}/>
                <div className="text-light" style={{fontSize:"0.8rem"}}>Note: you can search by username, item or game</div>
            </div>
            <h4 className="text-light">Posts</h4>
            <div className="posts-container">
                {searchResults.map((trade,index)=><Post key={index} trade={trade} token={token}/>)}
            </div>
            </div>
}

/*Function to filter all posts array looking for coincidences beetwen search and username,game name or item name */
function searchPost(posts, search){
    const lowerCaseSearchTerm = search.toLowerCase()
    let filteredPosts = posts.filter(post=>{
        if (post.username.toLowerCase().includes(lowerCaseSearchTerm)) {
            return true;
        }

        // Search game name
        if (post.gameName.toLowerCase().includes(lowerCaseSearchTerm)) {
            return true;
        }

        // Search offered items
        for (let offeredItem of post.offered) {
            if (offeredItem.item.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
        }

        // Search wanted items
        for (let wantedItem of post.wanted) {
            if (wantedItem.item.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                return true;
            }
        }

        // if nothing matches return false
        return false;
    })
    return filteredPosts
}