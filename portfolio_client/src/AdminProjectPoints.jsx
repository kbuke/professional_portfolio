import { useState } from "react"
import { AdminDeletePoint } from "./AdminDeletePoint"

export function AdminProjectPoints({
    project_point, id, project, allPoints, setAllPoints
}){
    const [pointAction, setPointAction] = useState(null)
    const [selectedPoint, setSelectedPoint] = useState(null)
    return(
        <>
            <div
                className="admin-project-point-section"
            >
                <p>{project_point}</p>

                <p
                    style={{textAlign: "center"}}
                >
                    {project?.project_name}</p>

                <div
                    className="admin-point-button-section"
                >
                    <button
                        className="admin-project-button admin-delete-button"
                        onClick={() => {
                            setPointAction("delete")
                            setSelectedPoint(id)
                        }}
                    >
                        Delete Point
                    </button>

                    <button
                        className="admin-project-button admin-edit-button"
                    >
                        Edit Point
                    </button>
                </div>
            </div>

            {pointAction === "delete" && selectedPoint == id?
                <AdminDeletePoint 
                    setPointAction={setPointAction}
                    setSelectedPoint={setSelectedPoint}
                    allPoints={allPoints}
                    setAllPoints={setAllPoints}
                    id={id}
                />
                :
                null
            }
        </>
    )
}