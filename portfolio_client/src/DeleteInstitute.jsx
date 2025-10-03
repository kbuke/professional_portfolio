import { useDelete } from "./useDelete"

export function DeleteInstitute({
    instituteId,
    setAllInstitutes,
    setDeleteInstitute
}){
    const handleDelete = (e) => {
        useDelete(e, `/api/institutes/${instituteId}`, setAllInstitutes, instituteId, setDeleteInstitute)
    }

    return(
        <div>
            <h1>Delete this institute?</h1>

            <div>
                <button
                    onClick={e => handleDelete(e)}
                >
                    Delete
                </button>

                <button
                    onClick={() => setDeleteInstitute(null)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}