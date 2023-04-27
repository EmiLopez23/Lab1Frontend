import { useContext, useEffect, useState } from "react"
import FormButton from "../button/FormButton"
import { UserContext } from "../../contexts/UserContext"

export default function AddToInventory(){
    const {token} = useContext(UserContext)
    const[games,setGames]=useState({})
    const[success,setSuccess]=useState(false)
    const[game,setGame]=useState("")
    const[itemtoAdd,setItemToAdd] = useState({
        quantity:1,
        itemId:0
    })

    useEffect(()=>{
        fetch("http://localhost:8080/games/all")
        .then(resp=>resp.json())
        .then(data=>{
            let dataToReturn = {}
            
            data.forEach((item)=> {
              dataToReturn = {
                ...dataToReturn,
                [item.name]: item
              }
             })
          setGames(dataToReturn)
         })
    },[])

    const handleGameChange = (event)=>{
        setGame(event.target.value)
    }
    
    const handleInputChange = (event)=>{
        const name = event.target.name
        let value= event.target.value;
        setItemToAdd({...itemtoAdd,[name]:value})}

    function handleSubmit(event){
        event.preventDefault()
        console.log(itemtoAdd)
        fetch("http://localhost:8080/user/inventory/addItem",{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(itemtoAdd)
        }).then(resp=>{
            if(resp.ok){setSuccess(true)}
            else{
                throw new Error("Error")
            }
        })
    }


    return (
        <form onSubmit={handleSubmit} className={`rounded-3 p-5 form-card  bg-dark text-light`}>
            {success &&
                <div class="alert alert-success" role="alert">
                    Succesfully added
                </div>}
            <div className="mb-3 form-group">
                <label className="form-label">Game</label>
                <select className="form-control" value={game} name="game" onChange={handleGameChange} required>
                    <option value="" hidden defaultValue>Select Game...</option>
                    {Object.values(games).map(game=><option value={game.name} key={game.name}>{game.name}</option>)}
                </select>
            </div>
            <div className="mb-3 form-group">
                <label className="form-label">Item</label>
                <select className="form-control" value={itemtoAdd.itemId} name="itemId" onChange={handleInputChange} required>
                <option value="" hidden defaultValue>Select Item...</option>
                {games[game]?.itemList.map(item=><option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
            </div>
            <div className="mb-3 form-group">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control" name="quantity" onChange={handleInputChange} required/>
            </div>

            <FormButton className="w-50" text="Add Item"/>
        </form>
    )
}