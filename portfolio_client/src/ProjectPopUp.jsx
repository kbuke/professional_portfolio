import { useEffect, useState } from "react"
import { useFetch } from "./useFetch"

export function ProjectPopUp({
    selectedProject,
    setSelectedProject
}){
    const [project, setProject] = useState()

    useFetch(`/api/projects/${selectedProject}`, setProject)

    const projectImg = project?.project_img 
    const projectParagraphs = project?.paragraphs
    const projectName = project?.project_name

    useEffect(() => {
        document.body.classList.add("no-scroll")
        return () => {
            document.body.classList.remove("no-scroll")
        }
    }, [])

    console.log(project)
    return(
        <div
            className="popup-background"
        >
            <div
                className="popup-container"
                style={{
                    backgroundImage: `url(${projectImg})`
                }}
            >
                <div
                    className="pop-up-text"
                >
                    <h1
                        className="project-info-title"
                    >
                        {projectName}
                    </h1>

                    <div
                        className="project-paragraphs"
                    >
                        {projectParagraphs?.map((paragraph, index) => (
                            <div
                                key={index}
                            >
                                {paragraph?.paragraph_title?
                                    <h2>
                                        {paragraph?.paragraph_title}
                                    </h2>
                                    :
                                    null
                                }

                                <p>
                                    {paragraph?.paragraph}
                                </p>

                                {
                                    paragraph?.paragraph_img_1 !== "" || paragraph?.paragraph_img_2 !== "" ?
                                        <div
                                            className="paragraph-img-div"
                                        >
                                            {paragraph?.paragraph_img_1?
                                                <img 
                                                    src={paragraph.paragraph_img_1}
                                                    className="paragraph-img"
                                                />
                                                :
                                                null
                                            }

                                            {paragraph?.paragraph_img_2?
                                                <img 
                                                    src={paragraph.paragraph_img_2}
                                                    className="paragraph-img"
                                                />
                                                :
                                                null
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        ))}
                    </div>

                    <div
                        className="project-info-button-container"
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="close-project-info"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}