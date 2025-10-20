import { useState } from "react"
import { AdminDeleteProject } from "./AdminDeleteProject"
import { AddProject } from "./AddProject"
import { AdminAddProject } from "./AdminAddProject"
import { AdminAddProjectPoint } from "./AdminAddProjectPoint"

export function AdminProjects({
    project_name, id,
    allProjects, setAllProjects,
    allInstitutes,
    projectAction,
    setProjectAction,
    allPoints,
    setAllPoints
}){
    // const [projectaction, setProjectAction] = useState(null)
    const [selectedproject, setSelectedProject] = useState(null)
    return(
        <div>

            {projectAction === "Add"?
                <AdminAddProject 
                    allProjects={allProjects}
                    setAllProjects={setAllProjects}
                    allInstitutes={allInstitutes}
                    setProjectAction={setProjectAction}
                />
                :
                null
            }

            <div
                className="admin-project-option-grid"
            >
                <h3
                    className="admin-instance-title"
                >
                    {project_name}
                </h3>

                {projectAction === "delete" && selectedproject === id?
                    <AdminDeleteProject 
                        projectName={project_name}
                        id={id}
                        setAllProjects={setAllProjects}
                        setProjectAction={setProjectAction}
                        setSelectedProject={setSelectedProject}
                    />
                    :
                    projectAction === "point" && selectedproject === id? 
                        <AdminAddProjectPoint 
                            id={id}
                            allPoints={allPoints}
                            setAllPoints={setAllPoints}
                            setProjectAction={setProjectAction}
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

                        <button
                            className="admin-project-button admin-add-point-button"
                            onClick={() => {
                                setProjectAction("point")
                                setSelectedProject(id)
                            }}
                        >
                            Add Point
                        </button>
                    </div>
                } 
            </div>
        </div>
    )
}