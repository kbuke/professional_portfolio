import { useEffect, useState } from "react"
import { AddTech } from "./AddTech"
import { useDelete } from "./useDelete"
import { useFetch } from "./useFetch"
import { DeleteTech } from "./DeleteTech"

export function TechStack({
    inputChange
}){
    const [allTech, setAllTech] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [deleteTech, setDeleteTech] = useState(null)

    useFetch("/api/technologies", setAllTech)

    //Render all Tech
    const renderTech = allTech?.map(tech => {
        return(
            <div key={tech.id}>
                <img src={tech.tech_img}/>
                <h2>{tech.tech_name}</h2>

                <button
                    onClick={() => setDeleteTech(tech.id)}
                >
                    Delete {tech.tech_name}
                </button>

                {deleteTech ?
                    <DeleteTech 
                        techId={parseInt(tech.id, 10)}
                        setAllTech={setAllTech}
                        setDeleteTech={setDeleteTech}
                    />
                    :
                    null
                }
            </div>
        )
    })

    return(
        <div>
            {isError ?
                <h1>Error Fetching Tech-STack</h1>
                :
                <>
                    <h1>Tech-Stack</h1>
                    {isLoading ?
                        <h2>Loading Tech-Stack...</h2>
                        :
                        <>
                            <div>
                                {renderTech}
                            </div>

                            <AddTech 
                                inputChange = {inputChange}
                                allTech={allTech}
                                setAllTech={setAllTech}
                            />
                        </>
                    }
                </>
            }
        </div>
    )
}