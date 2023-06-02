import React, { createContext, useState} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [id, setId] = useState(localStorage.getItem("id"));

  const login = (token,role,username,id) => {
    setToken(token);
    setRole(role)
    setUsername(username)
    setId(id)
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("id", id);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUsername(null)
    setId(null)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
  };

  return (
    <UserContext.Provider value={{ token, role, login, logout, username,id}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }