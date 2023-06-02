import "./AddGamePopUp.css"
import React, {useState} from "react";
import { Toaster } from "react-hot-toast";
import AddGame from "./Single/AddGame";
import AddGameAsJSON from "./AsJSON/AddGameAsJSON";



export default function AddGamePopUp() {
    const [tab,setTab] = useState(0)




    return <>
        <Toaster position="top-center" toastOptions={{duration: 3000,style: {background: '#333',color: '#fff',}}}/>
        <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex gap-2">
                <button className={`btn toggle-tab-btn ${tab===0 ? "active" : ""}`} onClick={()=>setTab(0)}>Single</button>
                <button className={`btn toggle-tab-btn ${tab===1 ? "active" : ""}`} onClick={()=>setTab(1)}>JSON</button>
            </div>
        </div>
        <div> 
        {tab === 0 ?
            <AddGame/>
        :
            <AddGameAsJSON/>
        }
        </div>
    </>
}