import { useEffect, useState } from "react"
import { AddTech } from "./AddTech"
import { useDelete } from "./useDelete"
import { useFetch } from "./useFetch"

export function TechStack({
    inputChange
}){
    const [allTech, setAllTech] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useFetch("/api/technologies", setAllTech)

    console.log(allTech)
    



    //Render all Tech
    const renderTech = allTech?.map(tech => {
        return(
            <div key={tech.id}>
                <img src={tech.tech_img}/>
                <h2>{tech.tech_name}</h2>
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