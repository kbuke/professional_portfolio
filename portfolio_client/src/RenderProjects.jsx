import { useState } from "react"
import { AddProjectPoint } from "./AddProjectPoint"
import { AddProjectTech } from "./AddProjectTech"
import { DeleteProject } from "./DeleteProject"
import { PatchProject } from "./PatchProject"

export function RenderProject({
    id, backend, frontend, institute, points, project_intro,
    project_name, projcect_video, project_img, project_start_date, 
    project_end_date, setProjectAction, projectAction, inputChange,
    dateInput, setAllProjects, allPoints, setAllPoints, allFrontEnd,
    setAllFrontEnd, allBackEnd, setAllBackEnd, project
}){
    const [selectedProjectId, setSelectedProjectId] = useState(null)

    const instituteImg = institute?.institute_img
    const instituteName = institute?.institute_name

    const renderProjectStack = (stack, stackName) => (
        stack?.length > 0 ? (
            <div>
                <label>{stackName}</label>
                {stack.map((tech, index) => (
                    <div key={index}>
                        <img src={tech?.tech_img} alt={tech?.tech_name} />
                        <p>{tech?.tech_name}</p>
                    </div>
                ))}
            </div>
        ) : null
    )

    const projectButtons = (buttonText) => {
        return(
            <button
                onClick={() => {
                    setProjectAction(buttonText)
                    setSelectedProjectId(id)
                }}
            >
                {buttonText}
            </button>
        )
    }

    return(
        <div 
            className={`project project-${project_name}`}
        >
            {/* Left hand side of container showing picture/vid and institute */}
            <div className="project-img-video">
                <img src={projcect_video?projcect_video:project_img}/>

                <div className="project-institute">
                    <img src={instituteImg}/>
                    <h3>{instituteName}</h3>
                </div>
            </div>

            {/* Right hand side showing title, dates, intro, points, stack and button options */}
            <div className="project-info">
                <h2>{project_name}</h2>
                <p>
                    <span className="project-dates">Start Date: </span>
                    {project_start_date}
                </p>
                {project_end_date ?
                    <p>
                        <span className="project-dates">End Date: </span>
                        {project_end_date}
                    </p>
                    :
                    null
                }

                <p>{project_intro}</p>

                {points.length > 0?
                    <ul>
                        {points.map((point, index) => {
                            return(
                                <li
                                    key={index}
                                >
                                    {point.project_point}
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <p>No Points Registered Yet.</p>
                }

                {renderProjectStack(frontend, "Front-End: ")}
                {renderProjectStack(backend, "Back-End: ")}

                <div className="project-buttons-div">
                    {projectButtons("Add Point")}
                    {projectButtons("More Information")}
                    {projectButtons("Add Tech")}
                    {projectButtons("Delete Project")}
                    {projectButtons("Edit Project")}
                </div>
            </div>

            {/* Allows for pop ups based on selected action */}
            {projectAction === "Add Point" && selectedProjectId === id? 
                <AddProjectPoint 
                    selectedProjectId={selectedProjectId}
                    setSelectedProjectId={setSelectedProjectId}
                    setProjectAction={setProjectAction}
                    inputChange={inputChange}
                    allPoints={allPoints}
                    setAllPoints={setAllPoints}
                />
                :
            projectAction=== "Add Tech" && selectedProjectId == id?
                <AddProjectTech 
                    selectedProjectId={selectedProjectId}
                    setSelectedProjectId={setSelectedProjectId}
                    setProjectAction={setProjectAction}
                    allBackEnd={allBackEnd}
                    setAllBackEnd={setAllBackEnd}
                    allFrontEnd={allFrontEnd}
                    setAllFrontEnd={setAllFrontEnd}
                    {...project}
                />
                :
            projectAction === "Delete Project" && selectedProjectId == id?
                <DeleteProject 
                    selectedProjectId={selectedProjectId}
                    setAllProjects={setAllProjects}
                    setProjectAction={setProjectAction}
                />
                :
            projectAction === "Edit Project" && selectedProjectId == id?
                <PatchProject 
                    selectedProjectId={selectedProjectId}
                    setProjectAction={setProjectAction}
                    inputChange={inputChange}
                    dateInput={dateInput}
                    setAllProjects={setAllProjects}
                />
                :
                null
                /* Need to add More Info option */
            }
        </div>
    )
}