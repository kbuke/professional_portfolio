import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePost } from "./usePost";
import { useEffect } from "react";

export function AdminAddApi({
    projectId,
    apiTech,
    allApi,
    setAllApi,
    setProjectAction,
    techId,
    setTechId
}){
    const [availableApi, setAvailableApi] = useState([])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const submitNewApi = (formData) => {
        formData.projectId = projectId
        formData.techId = techId

        usePost("/api/apiprojects", formData, allApi, setAllApi)
        setProjectAction(null)
        setTechId(null)
    }

    useEffect(() => {
        if (!apiTech.length) return;

        // Step 1: Get tech_ids that are already linked to THIS project
        const usedTechIds = allApi
        .filter(link => link.project_id === projectId)
        .map(link => link.tech_id);

        // Step 2: Filter frontendTech to keep only those not already linked
        const available = apiTech.filter(
        tech => !usedTechIds.includes(tech.id)
        );

        // Step 3: Update state
        setAvailableApi(available);
    }, [allApi, apiTech, projectId]);

    return (
        <form 
            className="add-project-tech-div"
            onSubmit={handleSubmit(submitNewApi)}
        >
            <h1>Add New API</h1>
            <div
                className="add-project-tech-grid"
            >
                {availableApi.map((api, index) => (
                    <button
                        key={index}
                        className="available-project-tech-div"
                        type="submit"
                        // {...register("techId")}
                        onClick={() => setTechId(api.id)}
                    >
                    <img 
                        src={api.tech_img}
                        alt={`${api.tech_name}-img`}
                        className="available-project-tech-img"
                    />

                    <p>
                        {api.tech_name}
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
    );
}