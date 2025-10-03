import { useDelete } from "./useDelete"

export function DeleteTech({
    techId,
    setAllTech,
    setDeleteTech
}){
    const handleDelete = (e) => {
        useDelete(e, `/api/technologies/${techId}`, setAllTech, techId, setDeleteTech)
    }

    return(
        <div>
            <h1>Do you want to delete this tech?</h1>

            <div>
                <button
                    onClick={e => handleDelete(e)} 
                >
                    Delete
                </button>

                <button
                    onClick={() => setDeleteTech(null)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}