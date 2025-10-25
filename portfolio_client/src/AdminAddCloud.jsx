import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { usePost } from "./usePost";

export function AdminAddCloud({
    projectId, 
    cloudTech,
    allCloud,
    setAllCloud,
    setProjectAction,
    techId,
    setTechId
}){
    const [availableCloud, setAvailableCloud] = useState([])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    
    const submitNewCloud = (formData) => {
        formData.projectId = projectId
        formData.techId = techId
    
        usePost("/api/cloudprojects", formData, allCloud, setAllCloud)
        setProjectAction(null)
        setTechId(null)
    }
    
    useEffect(() => {
        if(!cloudTech?.length) return; 
    
        const usedTechIds = allCloud.filter(link => link.project_id === projectId).map(link => link.tech_id)
    
        const available = cloudTech.filter(
            tech => !usedTechIds.includes(tech.id)
        )
    
        setAvailableCloud(available)
    }, [allCloud, cloudTech, projectId])
    
    return(
        <form
            className="add-project-tech-div"
            onSubmit={handleSubmit(submitNewCloud)}
        >
            <h1>Add New Cloud Tech</h1>
            <div
                className="add-project-tech-grid"
            >
                {availableCloud.map((cloud, index) => (
                    <button
                        key={index}
                        className="available-project-tech-div"
                        type="submit"
                        onClick={() => setTechId(cloud.id)}
                    >
                        <img 
                            src={cloud.tech_img}
                            alt={`${cloud.tech_name}-img`}
                            className="available-project-tech-img"
                        />
    
                        <p>
                            {cloud.tech_name}
                        </p>
                    </button>
                ))}
            </div>
    
            <button
                onClick={() => setProjectAction(null)}
                className="admin-project-tech-cancel-button"
            >
                Cancel
            </button>
        </form>
    )
}