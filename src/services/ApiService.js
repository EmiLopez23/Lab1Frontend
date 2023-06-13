
const localhost = "http://localhost:8080/" 

const AuthUrl = localhost + "api/auth/"
const postsUrl = localhost + "post/"
const inventoryUrl = localhost + "inventory/"
const userUrl = localhost + "user/"
const gamesUrl = localhost + "games/"



const ApiService = {

    login : async (userData) => {
        try{
        const response =  await fetch(AuthUrl + "login", 
                                    {
                                        method:"POST",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify(userData),
                                    })

        if(!response.ok){
            throw new Error("Invalid Credentials")
        }                                  
        const data = await response.json()
        return data;
        } catch(error){
            throw error
        }
    }

    ,

    register: async (userData) =>{
        try{
        const response =  await fetch(AuthUrl + "register", 
                                    {
                                        method:"POST",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify(userData),
                                    })

        if(!response.ok){
            const errMsg = await response.text();
            throw new Error(errMsg);
        }                                  
        const data = await response.json()
        return data;
        }catch(error){
            throw error
        }
    }

    , 

    getPosts: async(token)=>{
        try{
            const response = await  fetch(postsUrl+"all", 
                                        {
                                            headers:{Authorization:`Bearer ${token}`}
                                        })
            if(!response.ok){
                throw new Error("Invalid token")
            }
            const data = await response.json()
            let dataToReturn = []
            data.forEach(dataTrade => {

                dataToReturn=[...dataToReturn,
                    {
                        id:dataTrade.id,
                        gameName:dataTrade.gameName,
                        username:dataTrade.username,
                        offered:dataTrade.tradeItems.filter(t=>t.tradeDirection==='OFFERED'),
                        wanted:dataTrade.tradeItems.filter(t=>t.tradeDirection==='WANTED')
                    }]
            })
            return dataToReturn
        }catch(error){
            throw error
        }
    }
    ,

    getActivePosts: async(token)=>{
        try{
            const response = await  fetch(postsUrl+"allActive", 
                                        {
                                            headers:{Authorization:`Bearer ${token}`}
                                        })
            if(!response.ok){
                throw new Error("Invalid token")
            }
            const data = await response.json()
            let dataToReturn = []
            data.forEach(dataTrade => {

                dataToReturn=[...dataToReturn,
                    {
                        id:dataTrade.id,
                        gameName:dataTrade.gameName,
                        username:dataTrade.username,
                        offered:dataTrade.tradeItems.filter(t=>t.tradeDirection==='OFFERED'),
                        wanted:dataTrade.tradeItems.filter(t=>t.tradeDirection==='WANTED')
                    }]
            })
            return dataToReturn
        }catch(error){
            throw error
        }
    }

    ,

    getInventory: async()=>{
        try{
            const response = await fetch(inventoryUrl + "all")
            if(!response.ok){
                throw new Error("Invalid Token")
            }
            const data = await response.json()
            return data
        }catch(error){
            throw error
        }

    }

    ,

    getUserInventory: async(token)=>{
        try{
            const response = await fetch(userUrl + "inventory",{
                headers:{
                    Authorization:`Bearer ${token}`}
                })
            if(!response.ok){
                throw new Error("Invalid Token")
            }            
            const data = await response.json()
            return data
        }catch(error){
            throw error
        }
    }

    ,

    getGames: async()=>{
        try{
            const response = await fetch(gamesUrl + "all")
            
            if(!response.ok){
                throw new Error("An error has occured")
            }
            
            const data = await response.json()
            let dataToReturn = {}
            data.forEach((item)=> {
                dataToReturn = {
                  ...dataToReturn,
                  [item.name]: item
                }
               })
            return dataToReturn
        }catch(error){
            throw error
        }
    }

    ,

    getInvites: async(token)=>{
        try{
            const response = await fetch(postsUrl + "all-invites",{
                headers:{
                    Authorization:`Bearer ${token}`}
                })
            if(!response.ok){
                console.log(response)
                throw new Error(response.json())
            }            
            const data = await response.json()
            return data
        }catch(error){
            throw error
        }
    }
}

export default ApiService