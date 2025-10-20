import { useForm } from "react-hook-form"
import { useDelete } from "./useDelete"

export function AdminDeletePoint({
    setPointAction, setSelectedPoint,
    allPoints, setAllPoints, id
}){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const deletePoint = (id) => {
        useDelete(`/api/points/${id}`, setAllPoints, id, setPointAction)
    }

    return(
        <form
            onSubmit={handleSubmit(() => deletePoint(id))}
        >
            <h2>Delete This Point?</h2>

            <button>Delete</button>
            <button
                onClick={() => {
                    setPointAction(null)
                    setSelectedPoint(null)
                }}
            >Cancel</button>
        </form>
    )
}