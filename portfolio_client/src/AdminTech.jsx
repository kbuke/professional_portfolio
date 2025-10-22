import { useState } from "react"
import { AdminDeleteTech } from "./AdminDeleteTech"

export function AdminTech({
    tech_name, tech_img, id, setAllTech,
    techAction, setTechAction
}){
    // const [techAction, setTechAction] = useState(null)
    const [techId, setTechId] = useState(null)

    return(
        <div
            className="admin-project-option-grid"
        >
            <div
                className="admin-tech-img-block"
            >
                <h3
                    className="admin-instance-title"
                >
                    {tech_name}
                </h3>

                <img 
                    alt={`${tech_name}-img`}
                    src={tech_img}
                    className="admin-tech-img"
                />
            </div>

            {techId === id && techAction === "delete"?
                <AdminDeleteTech 
                    tech_name={tech_name}
                    id={id}
                    setAllTech={setAllTech}
                    setTechAction={setTechAction}
                    setTechId={setTechId}
                />
                :
                <div
                    className="admin-project-button-div"
                >
                    <button
                        className="admin-project-button admin-delete-button"
                        onClick={() => {
                            setTechAction("delete")
                            setTechId(id)
                        }}
                    >
                        Delete Tech
                    </button>

                    <button
                        className="admin-project-button admin-edit-button"
                    >
                        Edit Tech
                    </button>
                </div>
            }
        </div>
    )
}