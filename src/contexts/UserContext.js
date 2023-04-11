import React, { createContext, useState} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = (token,role) => {
    setToken(token);
    setRole(role)
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <UserContext.Provider value={{ token, role, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }