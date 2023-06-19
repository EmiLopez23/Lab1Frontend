import AddGame from "./AddGame";
import AddGameAsJSON from "./AddGameAsJSON";
import "./AddGamePopUp.css"
import React, {useState} from "react";



export default function AddGamePopUp() {
    const [tab,setTab] = useState(0)




    return <>
        <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex gap-2">
                <button className={`btn btn-outline-violet ${tab===0 ? "active" : ""}`} onClick={()=>setTab(0)}>Single</button>
                <button className={`btn btn-outline-violet ${tab===1 ? "active" : ""}`} onClick={()=>setTab(1)}>JSON</button>
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