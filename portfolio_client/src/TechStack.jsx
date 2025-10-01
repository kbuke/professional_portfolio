import { useEffect, useState } from "react"
import { AddTech } from "./AddTech"
import { useDelete } from "./useDelete"

export function TechStack({allTech, setAllTech}){
    console.log(allTech)
    const renderTech = allTech.map(tech => {
        return(
            <div key={tech.id}>
                <img src={tech.tech_img}/>
                <h2>{tech.tech_name}</h2>
                <button
                    onClick={e => {
                        useDelete(
                            e, 
                            `/api/technologies/${tech.id}`,
                            setAllTech, 
                            tech.id
                        )
                    }}
                >
                    Delete
                </button>
            </div>
        )
    })

    return (
        <>
            <div>{renderTech}</div>
            <AddTech 
                allTech={allTech}
                setAllTech={setAllTech}
            />
        </>
    )
}