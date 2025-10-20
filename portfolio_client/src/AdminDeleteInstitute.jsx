import { useDelete } from "./useDelete"
import { useForm } from "react-hook-form"

export function AdminDeleteInstitute({
    instituteName, id,
    setAllInstitutes,
    setInstituteAction,
    setSelectedInstitute
}){
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const deleteInstitute = (id) => {
        useDelete(`/api/institutes/${id}`, setAllInstitutes, id, setInstituteAction)
    }

    return(
        <form
            onSubmit={handleSubmit(() => deleteInstitute(id))}
        >
            <h2>Delete {instituteName}?</h2>

            <div>
                <button>
                    Delete
                </button>

                <button
                    onClick={() => {
                        setInstituteAction(null)
                        setSelectedInstitute(null)
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}