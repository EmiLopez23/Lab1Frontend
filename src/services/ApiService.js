
const localhost = "http://localhost:8080/" 

const AuthUrl = localhost + "api/auth/"
//const userUrl = localhost + "user/"



const ApiService = {

    login : async (userData) => {
        const response =  await fetch(AuthUrl + "login", 
                                    {
                                        method:"POST",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify(userData),
                                    })
        const data = await response.json()
        return data;
    }

    ,

    register: async (userData) =>{
        const response =  await fetch(AuthUrl + "register", 
                                    {
                                        method:"POST",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify(userData),
                                    })
        const data = await response.json()
        return data;
    }
}

export default ApiService