import { useForm } from "react-hook-form"
import { usePost } from "./usePost"
import { useEffect } from "react"
import { useState } from "react"

export function AdminAddBackend({
    projectId,
    backendTech,
    allBackend,
    setAllBackend,
    setProjectAction,
    techId,
    setTechId
}){
    console.log(`Editing project ${projectId}`)
    console.log(backendTech)
    const [availableBackend, setAvailableBackend] = useState([])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const submitNewBackend = (formData) => {
        formData.projectId = projectId
        formData.techId = techId

        usePost("/api/backendtech", formData, allBackend, setAllBackend)
        setProjectAction(null)
        setTechId(null)
    }

    useEffect(() => {
        if(!backendTech?.length) return; 

        const usedTechIds = allBackend.filter(link => link.project_id === projectId).map(link => link.tech_id)

        const available = backendTech.filter(
            tech => !usedTechIds.includes(tech.id)
        )

        setAvailableBackend(available)
    }, [allBackend, backendTech, projectId])

    return(
        <form
            className="add-project-tech-div"
            onSubmit={handleSubmit(submitNewBackend)}
        >
            <h1>Add New Backend</h1>
            <div
                className="add-project-tech-grid"
            >
                {availableBackend.map((be, index) => (
                    <button
                        key={index}
                        className="available-project-tech-div"
                        type="submit"
                        onClick={() => setTechId(be.id)}
                    >
                        <img 
                            src={be.tech_img}
                            alt={`${be.tech_name}-img`}
                            className="available-project-tech-img"
                        />

                        <p>
                            {be.tech_name}
                        </p>
                    </button>
                ))}
            </div>

            <button
                onClick={() => setProjectAction(null)}
                className="admin-project-tech-cancel-button"
            >
                Cancel
            </button>
        </form>
    )
}