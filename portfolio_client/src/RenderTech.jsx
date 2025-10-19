import { useState } from "react"
import { useFetch } from "./useFetch"

export function RenderTech(){
    const [allTech, setAllTech] = useState([])

    useFetch("/api/technologies", setAllTech)

    console.log(allTech)

    return(
        <div
            className="tech-grid"
        >
            {allTech.map((tech, index) => {
                return(
                    <div 
                        key={index}
                        className="tech-card"
                    >
                        <img 
                            src={tech.tech_img}
                            className="tech-logo"
                            alt={tech.tech_name}
                        />
                        <p
                            className="tech-name"
                        >
                            {tech.tech_name.toUpperCase()}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}