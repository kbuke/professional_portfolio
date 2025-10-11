import { useDelete } from "./useDelete"


export function DeleteProject({
    // projectId,
    // setAllProjects,
    // setDeleteProject
    selectedProjectId,
    setAllProjects,
    setProjectAction
}){
    console.log("Deleting project", selectedProjectId)
    const handleDelete = (e) => {
        useDelete(e, `/api/projects/${selectedProjectId}`, setAllProjects, selectedProjectId, setProjectAction)
    }

    return(
        <div>
            <h1>Do you want to delete project?</h1>

            <div>
                <button
                    onClick={e => handleDelete(e)}
                >
                    Delete
                </button>

                <button
                    onClick={() => setProjectAction(null)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}