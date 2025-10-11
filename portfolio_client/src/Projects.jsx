import { useState } from "react";
import { useFetch } from "./useFetch";
import { AddProject } from "./AddProject";
import { RenderProject } from "./RenderProjects";

export function Projects({inputChange, dateInput}){
    const [allProjects, setAllProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [projectAction, setProjectAction] = useState(null)
    const [allPoints, setAllPoints] = useState([])
    const [allFrontEnd, setAllFrontEnd] = useState([])
    const [allBackEnd, setAllBackEnd] = useState([])
    
    useFetch("/api/points", setAllPoints)

    useFetch("/api/projects", setAllProjects, [allPoints.length, allFrontEnd.length, allBackEnd.length])

    console.log(allProjects)

    //Render projects
    const renderProjects = allProjects.map((project, index) => {
        return(
            <RenderProject 
                {...project}
                setProjectAction={setProjectAction}
                projectAction={projectAction}
                inputChange={inputChange}
                dateInput={dateInput}
                setAllProjects={setAllProjects}
                allPoints={allPoints}
                setAllPoints={setAllPoints}
                allFrontEnd={allFrontEnd}
                setAllFrontEnd={setAllFrontEnd}
                allBackEnd={allBackEnd}
                setAllBackEnd={setAllBackEnd}
                project={project}
                key={index}
            />
        )
    })

    return(
        <div>
            <h1>Projects</h1>

            {renderProjects}

            <button onClick={() => setProjectAction("Add Project")}>
                Add Project
            </button>

            {projectAction === "Add Project" ?
                <AddProject 
                    inputChange={inputChange}
                    allProjects={allProjects}
                    setAllProjects={setAllProjects}
                    dateInput={dateInput}
                    setProjectAction={setProjectAction}
                />
                :
                null
            }
        </div>
    )
}