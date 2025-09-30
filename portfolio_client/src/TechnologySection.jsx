import { useEffect } from "react";
import { useFetch } from "./customHooks/useFetch";

export function TechnologySection(){
    const allTech = useFetch("api/technologies")
    console.log(allTech)
    const tech = allTech?.data
    
    const renderTech = tech?.map(technology => {
        return(
            <div>
                <img src={technology.tech_img}/>
                <h3>{technology.tech_name}</h3>
            </div>
        )
    })
    

    return(
        <div>
            <h1>Technology</h1>
            <div>
                {renderTech}
            </div>
        </div>
    )
}