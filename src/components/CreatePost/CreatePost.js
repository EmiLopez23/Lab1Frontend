import "./CreatePost.css"
export default function CreatePost(){


    return <div className="create-post-card p-3">
        <select className="form-select">
                <option>CS:GO</option>
                <option>Rocket League</option>
                <option>TF2</option>
            </select>
        <div className="create-post-grid">
            <div className="pe-3">
                <h3 className="text-light">Offered</h3>
                <select className="form-select">
                    <option>TUKI</option>
                    <option>TUKI2</option>
                    <option>TUKI3</option>
                </select>
            </div>
            <div className="ps-3">
                <h3 className="text-light">Wanted</h3>
                <select className="form-select">
                    <option>TUKI</option>
                    <option>TUKI2</option>
                    <option>TUKI3</option>
                </select>
            </div>
        </div>
    </div>

}