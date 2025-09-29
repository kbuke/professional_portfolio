import { useEffect } from "react";
import { useFetch } from "./customHooks/useFetch";

export function TechnologySection(){
    const allTech = useFetch("http://127.0.0.1:5555/technologies")
    
    

    return(
        <div>
            <h1>Technology</h1>
            <div>
                
            </div>
        </div>
    )
}