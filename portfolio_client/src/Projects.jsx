import { useState } from "react";
import { RenderProjects } from "./RenderProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"

export function Projects({
    allProjects,
}){
    const [currentIndex, setCurrentIndex] = useState(0)

    const orderedProjects = [...allProjects].sort((a, b) => {
        return new Date(b.project_start_date) - new Date(a.project_start_date)
    })

    if(!orderedProjects || orderedProjects.length === 0) {
        return(
            <p>
                No Projects Available
            </p>
        )
    }

    // const lowestProjectId = Math.min(...orderedProjects.map(p => p.id))
    // const highestProjectId = Math.max(...orderedProjects.map(p => p.id))

    // const currentProject = orderedProjects[currentIndex]

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
    }

    const handleNext = () => {
        if(currentIndex < orderedProjects.length - 1) setCurrentIndex(currentIndex + 1)
    }

    console.log(allProjects)

    return(
        <div
            className="project-container"
        >
            <h1
                className="section-heading"
            >
                Projects
            </h1>

            <div
                className="project-button-div"
            >
                <div
                    className="arrow-text-grid"
                >
                    {currentIndex !== 0 ?
                        <p
                            className="project-arrow-options"
                        >
                            Previous Project
                        </p>
                        :
                        null
                    }
                    <button
                        className={`project-button ${currentIndex === 0? "disabled-project-arrow":null}`}
                        disabled={currentIndex === 0}
                        onClick={handlePrev}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowAltCircleLeft} 
                            className="arrow"
                        />
                    </button>
                </div>

                <div
                    className="arrow-text-grid"
                >
                    <button
                        className={`project-button ${currentIndex === orderedProjects.length - 1? "disabled-project-arrow":null}`}
                        disabled={currentIndex === orderedProjects.length - 1}
                        onClick={handleNext}
                        // onClick={() => setProjectId(projectId + 1)}
                    >
                        <FontAwesomeIcon 
                            icon={faArrowAltCircleRight} 
                            className="arrow"
                        />
                    </button>

                    {currentIndex === orderedProjects.length - 1 ?
                        null
                        :
                        <p
                            className="project-arrow-options"
                        >
                            Next Project
                        </p>
                    }
                </div>
            </div>

            <div
                className="project-slider-wrapper"
            >
                <div
                    className="project-slider"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {orderedProjects.map((project, index) => (
                        <RenderProjects 
                            {...project}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}