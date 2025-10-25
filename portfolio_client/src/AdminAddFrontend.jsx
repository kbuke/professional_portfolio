import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePost } from "./usePost";

export function AdminAddFrontend({
  projectId,
  frontendTech,
  allFrontend,     // <-- array of existing frontend-project relationships
  setAllFrontend,
  setProjectAction,
  techId,
  setTechId
}){
    const [availableFrontEnd, setAvailableFrontEnd] = useState([]);
    // const [techId, setTechId] = useState(null)
//   const [techId, setTechId] = useState(null)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const submitNewFrontend = (formData) => {
        formData.projectId = projectId
        formData.techId = techId
        console.log(`I am trying to pair project ${projectId} with tech ${techId}`)

        usePost("/api/frontendtech", formData, allFrontend, setAllFrontend)
        setProjectAction(null)
        setTechId(null)
    }

    useEffect(() => {
        if (!frontendTech.length) return;

        // Step 1: Get tech_ids that are already linked to THIS project
        const usedTechIds = allFrontend
        .filter(link => link.project_id === projectId)
        .map(link => link.tech_id);

        // Step 2: Filter frontendTech to keep only those not already linked
        const available = frontendTech.filter(
        tech => !usedTechIds.includes(tech.id)
        );

        // Step 3: Update state
        setAvailableFrontEnd(available);
    }, [allFrontend, frontendTech, projectId]);

    return (
        <form 
            className="add-project-tech-div"
            onSubmit={handleSubmit(submitNewFrontend)}
        >
            <h1>Add New Frontend</h1>
            <div
                className="add-project-tech-grid"
            >
                {availableFrontEnd.map((fe, index) => (
                    <button
                        key={index}
                        className="available-project-tech-div"
                        type="submit"
                        // {...register("techId")}
                        onClick={() => setTechId(fe.id)}
                    >
                    <img 
                        src={fe.tech_img}
                        alt={`${fe.tech_name}-img`}
                        className="available-project-tech-img"
                    />

                    <p>
                        {fe.tech_name}
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

