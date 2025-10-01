import { useState } from "react"
import { usePost } from "./usePost"

export function AddTech({
    allTech,
    setAllTech
}){
    const [techName, setTechName] = useState("")
    const [techImg, setTechImg] = useState("")
    const [isLoading, setIdLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleNewTech = (e) => {
        usePost(e, "/api/technologies", {
            techName: techName,
            techImg: techImg
        }, allTech, setAllTech)
    }

    return(
        <form
            onSubmit={e => handleNewTech(e)}
        >
            <h1>Add New Tech</h1>
            <input 
                type="text"
                onChange={e => setTechName(e.target.value)}
                placeholder="Please enter new tech name"
            />

            <input 
                type="text"
                onChange={e => setTechImg(e.target.value)}
                placeholder="Please enter the new tech logo"
            />

            <button>
                Create New Tech
            </button>
        </form>
    )
}