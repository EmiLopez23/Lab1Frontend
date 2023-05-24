import React, { createContext, useState} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const login = (token,role,username) => {
    setToken(token);
    setRole(role)
    setUsername(username)
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUsername(null)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  };

  return (
    <UserContext.Provider value={{ token, role, login, logout, username}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }