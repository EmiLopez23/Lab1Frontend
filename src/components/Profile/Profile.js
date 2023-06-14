import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { UserContext } from "../../contexts/UserContext"
import Post from "../PostCard/Post"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Profile.css"
import ImgSlider from "../ImgSlider/ImgSlider"
import PopUpContainer from "../PopUpContainer/PopUpContainer"
import ReportUserForm from "../ReportUserForm.js/ReportUserForm"

export default function Profile(){
    const {username} = useParams()
    const {token, username:currentUser} = useContext(UserContext)
    const [activetrades,setActiveTrades] = useState([])
    const [inventory,setInventory] = useState([])
    const [confirmedTrades,setConfirmedTrades] = useState([])
    const [showReportForm,setReportForm] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const info = await ApiService.getUserInformation(username,token);
            const activePosts = info.activePosts?.map(post=>post = {
              id: post.id,
              username:post.username,
              gameName:post.gameName,
              offered:post.tradeItems?.filter(t=>t.tradeDirection==='OFFERED'),
              wanted:post.tradeItems?.filter(t=>t.tradeDirection==='WANTED')
            })
            const acceptedTrades = info.confirmedTrades?.map(post=>post = {
              id: post.postResponse.id,
              username:post.postResponse.username,
              gameName:post.postResponse.gameName,
              offered:post.postResponse.tradeItems?.filter(t=>t.tradeDirection==='OFFERED'),
              wanted:post.postResponse.tradeItems?.filter(t=>t.tradeDirection==='WANTED'),
              requesterUsername:post.requesterUsername
            })
            setActiveTrades(activePosts)
            setInventory(info.inventory)
            setConfirmedTrades(acceptedTrades)
            console.log(info)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPosts();
      }, [token,username]);
    return <div className="text-light user-page-container">
      <div className="user-page-header">
      <h1 className="m-0">{username}</h1>
      {currentUser !== username && <button className="btn btn-outline-danger" onClick={()=>setReportForm(true)}><FontAwesomeIcon icon={faCircleExclamation} /> Report</button>}
      </div>
        
        <div className="user-page-body">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-title">Trades Completed</div>
              <div className="stat">{confirmedTrades.length}</div>
            </div>
          </div>
          <div className="user-inventory">
                <h4>Inventory</h4>
                <ImgSlider itemsArray={inventory} hasQty={true}/>
            </div>
            <div className="all-type-user-posts">
              <div className="user-posts-container">
                  <h4>Posts</h4>
                  <div className="user-posts">
                  {activetrades?.map((trade,index)=><Post key={index} trade={trade} token={token}/>)}
                  </div>
              </div>

              <div className="user-confirmed-trades-container">
                  <h4>Trade History</h4>
                  <div className="user-posts">
                  {confirmedTrades?.map((trade,index)=><Post key={index} trade={trade} token={token} canTrade={false} requester={trade.requesterUsername}/>)}
                  </div>
              </div>
            </div>
        </div>
        
        {showReportForm && <PopUpContainer element={<ReportUserForm username={username} token={token}/>} onClick={()=>setReportForm(false)}/>}
    </div>
}