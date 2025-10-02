import { useState } from "react";
import { useFetch } from "./useFetch";
import { AddProject } from "./AddProject";

export function Projects({inputChange, dateInput}){
    const [allProjects, setAllProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useFetch("/api/projects", setAllProjects)
    console.log(allProjects)

    const renderTech = (technologyType, typeText) => {
        return(
            technologyType?.length > 0 ?
                <>
                    <label>
                        {typeText}
                    </label>
                    {technologyType.map(tech => {
                        return(
                            <p key={tech?.id}>{tech.tech_name}</p>
                        )
                    })}
                </>
                :
                null
        )}


    const renderProjects = allProjects?.map((project, index) => {
        const projectBackendTech = project?.backend
        const projectFrontendTech = project?.frontend 
        const projectInstitute = project?.institute
        const instituteImg = projectInstitute?.institute_img
        const instituteName = projectInstitute?.institute_name
        const projectPoints = project?.points
        const projectIntro = project?.project_intro
        const projectName = project?.project_name
        const projectVideo = project?.project_video 
        const projectImg = project?.project_img
        const projectStartDate = project?.project_start_date
        const projectEndDate = project?.project_end_date
        return(
            <div key={index}>

                {/* Render project image or video */}
                <div>
                    {projectVideo ?
                        <video>{projectVideo}</video>
                        :
                        <img src={projectImg}/>
                    }
                </div>

                {/* Render Project Title, Intro and main points */}
                <div>
                    <h2>{projectName}</h2>

                    <div>
                        <div>
                            <label>Start Date:</label>
                            <p>{projectStartDate}</p>
                        </div>

                        {projectEndDate ?
                            <div>
                                <label>End Date:</label>
                                <p>{projectEndDate}</p>
                            </div>
                            :
                            <p>In Progress</p>
                        }
                    </div>

                    <p>{projectIntro}</p>

                    <div>
                        <ul>
                            {projectPoints?.map(point => {
                                return(
                                    <li key={point?.id}>{point.project_point}</li> 
                                )
                            })}
                        </ul>

                        <button>More Information</button>
                    </div>

                    {renderTech(projectFrontendTech, "Frontend:")}
                    {renderTech(projectBackendTech, "Backend:")}

                    <div>
                        <img src={instituteImg}/>
                        <h5>{instituteName}</h5>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <>
            {isLoading ?
                <h2>Loading....</h2>
                :
                <div>
                    {isError ?
                        <h2>Error Fetching Projects</h2>
                        :
                        <div>
                            <h1>Projects</h1>

                            {renderProjects}
                        </div>
                    }
                </div>
            }

            <AddProject 
                inputChange={inputChange}
                allProjects={allProjects}
                setAllProjects={setAllProjects}
                dateInput={dateInput}
            />
        </>
    )
}