import { act, useState } from "react"
import { AdminDeleteProject } from "./AdminDeleteProject"
import { AddProject } from "./AddProject"
import { AdminAddProject } from "./AdminAddProject"
import { AdminAddProjectPoint } from "./AdminAddProjectPoint"
import { AdminAddFrontend } from "./AdminAddFrontend"
import { AdminAddBackend } from "./AdminAddBackend"
import { AdminAddCloud } from "./AdminAddCloud"
import {AdminAddApi} from "./AdminAddApi"
import { AdminEditProject } from "./AdminEditProject"
import { AdminAddProjectParagrapgh } from "./AdminAddProjectPara"

export function AdminProjects({
    project_name, id,
    allProjects, setAllProjects,
    allInstitutes,
    projectAction,
    setProjectAction,
    allPoints,
    setAllPoints,
    allTech, setAllTech,
    allFrontend, setAllFrontend,
    allBackend, setAllBackend,
    allCloud, setAllCloud,
    allApi, setAllApi,
    projectId, setProjectId,
    allParagraphs, setAllParagraph
}){
    const [techId, setTechId] = useState(null)

    const filteredTech = (techType) => {
        return(
            allTech.filter(tech => tech.tech_type.toLowerCase() === techType.toLowerCase())
        )
    }

    const adminButtons = (buttonText, additionalClassName, action, id) => {
        return(
            <button
                className={`admin-project-button ${additionalClassName}`}
                onClick={() => {
                    setProjectAction(action)
                    setProjectId(id)
                }}
            >
                {buttonText}
            </button>
        )
    }

    return(
        <>
            <div
                className="admin-project-option-grid"
            >
                <h3
                    className="admin-instance-title"
                >
                    {project_name}
                </h3>

                {
                    projectId === id && projectAction==="delete"?
                        <AdminDeleteProject 
                            projectName={project_name}
                            id={id}
                            setAllProjects={setAllProjects}
                            setProjectAction={setProjectAction}
                            setSelectedProject={setProjectId}
                        />
                    :
                    projectId === id && projectAction === "edit"?
                        <AdminEditProject 
                            projectId={projectId}
                            setProjectAction={setProjectAction}
                            setAllProjects={setAllProjects}
                        />
                    :
                    projectId === id && projectAction==="point"?
                        <AdminAddProjectPoint 
                            id={id}
                            allPoints={allPoints}
                            setAllPoints={setAllPoints}
                            setProjectAction={setProjectAction}
                        />
                    :
                    projectId === id && projectAction==="frontend"?
                        <AdminAddFrontend 
                            projectId={projectId}
                            frontendTech={filteredTech("Frontend")}
                            allFrontend={allFrontend}
                            setAllFrontend={setAllFrontend}
                            setProjectAction={setProjectAction}
                            techId={techId}
                            setTechId={setTechId}
                        />
                    :
                    projectId === id && projectAction==="backend"?
                        <AdminAddBackend 
                            projectId={projectId}
                            backendTech={filteredTech("Backend")}
                            allBackend={allBackend}
                            setAllBackend={setAllBackend}
                            setProjectAction={setProjectAction}
                            techId={techId}
                            setTechId={setTechId}
                        />
                    :
                    projectId === id && projectAction==="cloud"?
                        <AdminAddCloud 
                            projectId={projectId}
                            cloudTech={filteredTech("Cloud")}
                            allCloud={allCloud}
                            setAllCloud={setAllCloud}
                            setProjectAction={setProjectAction}
                            techId={techId}
                            setTechId={setTechId}
                        />
                    :
                    projectId === id && projectAction==="api"?
                        <AdminAddApi 
                            projectId={projectId}
                            apiTech={filteredTech("Api")}
                            allApi={allApi}
                            setAllApi={setAllApi}
                            setProjectAction={setProjectAction}
                            techId={techId}
                            setTechId={setTechId}
                        />
                    :
                    projectId === id && projectAction === "paragraph"?
                        <AdminAddProjectParagrapgh 
                            projectId={projectId}
                            allParagraphs={allParagraphs}
                            setAllParagraph={setAllParagraph}
                            setProjectAction={setProjectAction}
                        />
                    :
                    <div
                        className="admin-project-button-div"
                    >
                        {adminButtons(
                            "Delete Project",
                            "admin-delete-button",
                            "delete",
                            id
                        )}

                        {adminButtons(
                            "Edit Project",
                            "admin-edit-button",
                            "edit",
                            id
                        )}

                        {adminButtons(
                            "Add Point",
                            "admin-add-point-button",
                            "point",
                            id
                        )}

                        {adminButtons(
                            "Add Frontend",
                            "add-frontend-button",
                            "frontend",
                            id
                        )}

                        {adminButtons(
                            "Add Backend",
                            "add-backend-button",
                            "backend",
                            id
                        )}

                        {adminButtons(
                            "Add Cloud",
                            "add-cloud-tech-button",
                            "cloud",
                            id
                        )}

                        {adminButtons(
                            "Add API",
                            "add-api-tech-button",
                            "api",
                            id
                        )}

                        {adminButtons(
                            "Add Paragraph",
                            "add-paragraph",
                            "paragraph",
                            id
                        )}
                    </div>
                }
            </div>
        </>
    )
}