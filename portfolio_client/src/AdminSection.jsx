import { AdminProjects } from "./AdminProjects"
import { AdminReviews } from "./AdminReviews"
import { AdminTech } from "./AdminTech"
import { AdminProjectPoints } from "./AdminProjectPoints"
import { AdminInstitutes } from "./AdminInstitutes"
import { useState } from "react"
import { AdminAddTech } from "./AdminAddTech"
import { AdminAddProject } from "./AdminAddProject"
import { AdminProjectParagraphs } from "./AdminProjectParagraphs"

export function AdminSection({
    allReviews, setAllReviews,

    allProjects, setAllProjects,

    allTech, setAllTech,

    allInstitutes, setAllInstitutes,

    allPoints, setAllPoints,

    allFrontend, setAllFrontend,

    allBackend, setAllBackend,

    allCloud, setAllCloud,

    allApi, setAllApi,

    allParagraphs, setAllParagraph
}){
    const [projectAction, setProjectAction] = useState(null)
    const [instituteAction, setInstituteAction] = useState(null)
    const [techAction, setTechAction] = useState(null)
    const [projectId, setProjectId] = useState(null)

    console.log(allParagraphs)


    const addInstance = (instance, setSectionAction) => {
        return(
                <button
                    className="admin-project-button admin-add-button"
                    // onClick={() => setProjectAction("Add")}
                    onClick={() => setSectionAction("Add")}
                >
                    Add {instance}
                </button>
        )
    }

    const sectionTitles = (section, component, setSectionAction) => {
        return(
            <div
                className="admin-section-div"
            >
                <h1
                    className="project-heading"
                >
                    {section}
                </h1>

                {addInstance(section, setSectionAction)}

                {component}
            </div>
        )
    }
    return(
        <div>
            <h1
                className="section-heading"
            >
                Admin Section
            </h1>

            {projectAction === "Add"? 
                <AdminAddProject 
                    allProjects={allProjects}
                    setAllProjects={setAllProjects}
                    allInstitutes={allInstitutes}
                    setProjectAction={setProjectAction}
                />
                :
                sectionTitles("Projects", 
                    allProjects.map((projects, index) => (
                        <AdminProjects 
                            {...projects}
                            allProjects={allProjects}
                            setAllProjects={setAllProjects}
                            key={index}
                            allInstitutes={allInstitutes}
                            projectAction={projectAction}
                            setProjectAction={setProjectAction}
                            allPoints={allPoints}
                            setAllPoints={setAllPoints}
                            allTech={allTech}
                            setAllTech={setAllTech}
                            allFrontend={allFrontend}
                            setAllFrontend={setAllFrontend}
                            allBackend={allBackend}
                            setAllBackend={setAllBackend}
                            allCloud={allCloud}
                            setAllCloud={setAllCloud}
                            allApi={allApi}
                            setAllApi={setAllApi}
                            projectId={projectId}
                            setProjectId={setProjectId}
                            allParagraphs={allParagraphs}
                            setAllParagraph={setAllParagraph}
                        />
                    )), setProjectAction
                )
            }

            {sectionTitles("Paragraphs", 
                allParagraphs.map((paragraph, index) => (
                    <AdminProjectParagraphs
                        {...paragraph}
                        allParagraphs={allParagraphs}
                        setAllParagraph={setAllParagraph}
                        key={index}
                    />
                ))
            )}

            {sectionTitles("Points", 
                allPoints.map((point, index) => (
                    <AdminProjectPoints 
                        {...point}
                        allPoints={allPoints}
                        setAllPoints={setAllPoints}
                        key={index}
                    />
                ))
            )}

            {techAction === "Add"?
                <AdminAddTech 
                    allTech={allTech}
                    setAllTech={setAllTech}
                    setTechAction={setTechAction}
                />
                :
                sectionTitles("Technology",
                    allTech.map((tech, index) => (
                        <AdminTech 
                            {...tech}
                            setAllTech = {setAllTech}
                            techAction={techAction}
                            setTechAction={setTechAction}
                            key={index}
                        />
                    )), setTechAction
                )
            }

            {sectionTitles("Reviews", 
                allReviews.map((review, index) => (
                    <AdminReviews 
                        {...review}
                        setAllReviews={setAllReviews}
                        key={index}
                    />
                ))
            )}

            {sectionTitles("Institutes", 
                allInstitutes.map((institute, index) => (
                    <AdminInstitutes 
                        {...institute}
                        setAllInstitutes={setAllInstitutes}
                        allInstitutes={allInstitutes}
                        instituteAction={instituteAction}
                        setInstituteAction={setInstituteAction}
                        key={index}
                    />
                )), setInstituteAction
            )}
        </div>
    )
}