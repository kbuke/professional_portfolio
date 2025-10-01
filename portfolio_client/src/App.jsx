import { useState } from "react"
import { useFetch } from "./useFetch"
import { TechStack } from "./TechStack"


function App() {
  const [allTech, setAllTech] = useState([])

  // Fetch all tech
  useFetch("/api/technologies", setAllTech)

  return (
    <>
      <TechStack 
        allTech={allTech}
        setAllTech={setAllTech}
      />
    </>
  )
}

export default App
