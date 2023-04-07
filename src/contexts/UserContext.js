import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(()=>{
      setToken(localStorage.getItem("token"))
    },[])

    const updateToken = (newToken) => {
        localStorage.setItem("token",newToken)
        setToken(newToken)
    }
  
    return (
      <UserContext.Provider value={{token,updateToken}}>
        {children}
      </UserContext.Provider>);
  };


export { UserContext, UserProvider };