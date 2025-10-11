import { useState } from "react"
import { useFetch } from "./useFetch"
import { useForm } from "react-hook-form"
import { usePost } from "./usePost"

export function AddProjectTech({
    // addProjectTech,
    // setAddProjectTech,
    // allFrontEnd,
    // setAllFrontEnd,
    // allBackEnd,
    // setAllBackEnd,
    selectedProjectId,
    setSelectedProjectId,
    setProjectAction,
    allBackEnd,
    setAllBackEnd,
    allFrontEnd,
    setAllFrontEnd,
    backend,
    frontend
}){

    const [allTech, setAllTech] = useState([])
    const [techId, setTechId] = useState(null)

    useFetch("/api/technologies", setAllTech)
    useFetch("/api/frontendtech", setAllFrontEnd)
    useFetch("/api/backendtech", setAllBackEnd)

    console.log(allTech)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const filterTech = (techType) => {
        const nonOverlap = allTech.filter(tech => 
            !techType.some(t => t.tech_name === tech.tech_name)
        )
        return nonOverlap
    }
    
    const availableFrontEnd = filterTech(frontend)
    const availableBackEnd = filterTech(backend)

    const submitFrontEnd = () => {
        const completeData = {
            projectId: selectedProjectId,
            techId: techId
        }
        usePost("/api/frontendtech", completeData, allFrontEnd, setAllFrontEnd, setProjectAction, setSelectedProjectId)
    }

    const submitBackEnd = () => {
        const completeData = {
            projectId: selectedProjectId,
            techId: techId
        }
        usePost("api/backendtech", completeData, allBackEnd, setAllBackEnd)
    }

    const renderTech = (availableTech, techType) => {
        return(
            <div>
                <h2>Add New {techType==="frontend"? "Frontend" : "Backend"} Tech</h2>
                {availableTech.map((tech, index) => {
                    return(
                        <form
                            key={index}
                            onSubmit={handleSubmit(techType === "frontend"? submitFrontEnd : submitBackEnd)} 
                        >
                            <div
                                onClick={() => setTechId(tech.id)}
                            >
                                <img src={tech.tech_img}/>
                                <p>{tech.tech_name}</p>
                            </div>
                            {techId && techId === tech.id?
                                <button>Add New Tech</button>
                                :
                                null
                            }
                        </form>
                    )
                })}
            </div>
        )
    }

    return(
        <div className="form">
            <h1>Add New Tech to Project</h1>
            {renderTech(availableFrontEnd, "frontend")}
            {renderTech(availableBackEnd, "backend")}

            <button
                // onClick={() => setAddProjectTech(null)}
                onClick={() => {
                    setSelectedProjectId(null)
                    setProjectAction(null)
                }}
            >
                Cancel
            </button>
        </div>
    )
}