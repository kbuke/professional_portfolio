import { useDelete } from "./useDelete"


export function DeleteProject({
    projectId,
    setAllProjects,
    setDeleteProject
}){
    const handleDelete = (e) => {
        useDelete(e, `/api/projects/${projectId}`, setAllProjects, projectId, setDeleteProject)
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
                    onClick={() => setDeleteProject(null)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}