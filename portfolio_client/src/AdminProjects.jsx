import { useState } from "react"
import { AdminDeleteProject } from "./AdminDeleteProject"

export function AdminProjects({
    project_name, id,
    setAllProjects
}){
    const [projectaction, setProjectAction] = useState(null)
    const [selectedproject, setSelectedProject] = useState(null)
    return(
        <div
            className="admin-project-option-grid"
        >
            <h3
                className="admin-instance-title"
            >
                {project_name}
            </h3>

            {projectaction && selectedproject === id?
                <AdminDeleteProject 
                    projectName={project_name}
                    id={id}
                    setAllProjects={setAllProjects}
                    setProjectAction={setProjectAction}
                    setSelectedProject={setSelectedProject}
                />
                :
                <div
                    className="admin-project-button-div"
                >
                    <button
                        className="admin-project-button admin-delete-button"
                        onClick={() => {
                            setProjectAction("delete")
                            setSelectedProject(id)
                        }}
                    >
                        Delete Project
                    </button>

                    <button
                        className="admin-project-button admin-edit-button"
                    >
                        Edit Project
                    </button>
                </div>
            } 
        </div>
    )
}