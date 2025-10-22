import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import computerScreen from "./resources/computer-screen.png"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faL, faLaptop } from "@fortawesome/free-solid-svg-icons"

export function RenderProjects({
    points, frontend, backend, id,
    project_name, project_start_date, project_end_date,
    project_intro, project_img, institute, setProjectMoreInfo,
    github_url, cloud, website_url
}){

    //RENDER PROJECT DATES
    const projectDates = (text, date) => {
        return(
            date === null ?
                <p
                    className="project-date-text ongoing-project-txt"
                >
                    On-going
                </p>
            :
            <p
                className="project-date-text"
            >
                <span
                    className="date-span"
                >
                    {text}
                </span>
                {date}
            </p>
        )
    }

    //RENDER PROJECT TECH
    const renderProjectTech = (techType, label) => {
        return(
            <div
                className="project-tech-container"
            >
                <label>
                    {label}
                </label>

                <div
                    className="tech-img-grid"
                >
                    <div
                        className="project-lang-img-container"
                    >
                        {techType.map((tech, index) => {
                            return(
                                <img 
                                    src = {tech?.tech_img}
                                    alt = {tech?.tech_name}
                                    key={index}
                                    className="project-tech-img"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    } 

    return(
        <div
            className="project-grid"
        >
            <div>
                <div
                    className="project-name-arrow-container"
                >
                    <h2
                        className="project-heading"
                    >
                        {project_name}
                    </h2>
                </div>

                <div
                    className="date-container"
                >
                    {projectDates("Start Date: ", project_start_date)}
                    {projectDates("End Date: ", project_end_date)}
                </div>

                <div
                    className="project-information-div"
                >
                    <p>
                        {project_intro}
                    </p>

                    {points.length === 0 ?
                        <p>No points to display.</p>
                        :
                        <ul>
                            {points.map((point, index) => {
                                return(
                                    <li
                                        key={index}
                                        className="project-point-li"
                                    >
                                        {point.project_point}
                                    </li>
                                )
                            })}
                        </ul>
                    }

                    <button
                        className="project-info-button"
                        onClick={() => setProjectMoreInfo(true)}
                    >
                        <span>
                            More Information
                        </span>
                    </button>
                </div>

                <div
                    className="project-tech-grid"
                >
                    {renderProjectTech(frontend, "Frontend Tech")}
                    {renderProjectTech(backend, "Backend Tech")}
                    {renderProjectTech(cloud, "Cloud Tech")}
                </div>
            </div>

            <div
                className="additional-project-info-div"
            >
                <div
                    className="project-screen-container"
                >
                    <img 
                        src={computerScreen}
                        className="project-screen"
                        alt="Computer Frame"
                    />

                    <img 
                        src={project_img}
                        className="project-img"
                        alt="Project Screenshot"
                    />
                </div>

                <div
                    className="project-institute-grid"
                >
                    <p
                        className="project-institute-label"
                    >
                        Completed At:
                    </p>

                    <img 
                        src={institute?.institute_img}
                        className="project-institute-img"
                    />
                </div>

                <div
                    className="project-links-div"
                >
                    {github_url ?
                        <a 
                            href={github_url}
                        >
                            <FontAwesomeIcon 
                                icon={faGithub}
                                className="github-repo-link"
                            />
                        </a>
                        :
                        null
                    }

                    {website_url ?
                        <a
                            href={website_url}
                        >
                            <FontAwesomeIcon 
                                icon={faLaptop}
                                className="github-repo-link"
                            />
                        </a>
                        :
                        null
                    }

                </div>
            </div>
        </div>
    )
}