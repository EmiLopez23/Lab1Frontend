import { useContext, useEffect, useState } from "react"
import Post from "../../components/PostCard/Post"
import "./Home.css"
import { UserContext } from "../../contexts/UserContext"
import ApiService from "../../services/ApiService"
import { Link } from "react-router-dom"
import { PrivateRoutes } from "../../consts/Constants"
import NoContent from "../../components/NoContent/NoContent"

export default function Home(){
    const [trades,setTrades] =useState([])
    const{token,username} = useContext(UserContext)
    const [searchPostInput, setSearchPost] = useState("")
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const posts = await ApiService.getActivePosts(token);
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
            <div className="search-post-container">
                <input placeholder="Search post..." className="form-control search-post" onChange={(e)=>setSearchPost(e.target.value)}/>
                <div className="text-light" style={{fontSize:"0.8rem",paddingTop:5}}>Note: you can search by item, game or username</div>
            </div>
            <div className="post-title py-3">
                <h4 className="text-light m-0">Posts</h4>
                <button className="btn btn-violet"><Link to={`/${PrivateRoutes.CREATE_POST}`} className="link">Create Post</Link></button>
            </div>
            {searchResults.length === 0
                ? <NoContent text={"Ooppss...seems like there are no posts"} height={"50vh"}/>
                : <div className="posts-container">{searchResults.map((trade,index)=><Post key={index} trade={trade} token={token}/>)}</div>
            }
            
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