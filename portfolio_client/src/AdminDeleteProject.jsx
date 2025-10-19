import { useForm } from "react-hook-form"
import { useDelete } from "./useDelete"
import { useState } from "react"

export function AdminDeleteProject({
    projectName, id,
    setAllProjects,
    setProjectAction, setSelectedProject
}){
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const deleteProject = (id) => {
        useDelete(`/api/projects/${id}`, setAllProjects, id, setProjectAction)
    }

    return(
        <form
            onSubmit={handleSubmit(() => deleteProject(id))}
        >
            <h2>Delete
                <span> {projectName}</span>
            ?
            </h2>

            <div>
                <button>Delete</button>
                <button
                    onClick={() => {
                        setProjectAction(null)
                        setSelectedProject(null)
                    }}
                >
                    Cancel
                </button>

            </div>
        </form>
    )
}