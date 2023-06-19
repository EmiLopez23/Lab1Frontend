import { createContext, useState } from "react"

export const CreatePostContext = createContext()

// Este es el que nos provee de acceso al contexto
export function CreatePostProvider ({ children }) {
  const [offeredItems, setOfferedItems] = useState([])
  const [wantedItems,setWantedItems] = useState([])

  return (
    <CreatePostContext.Provider value={{offeredItems,setOfferedItems,wantedItems,setWantedItems}}>
      {children}
    </CreatePostContext.Provider>
  )
}