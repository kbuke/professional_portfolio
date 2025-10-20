import { useForm } from "react-hook-form";
import { useDelete } from "./useDelete";

export function AdminDeleteTech({
    tech_name, id,
    setAllTech,
    setTechAction, setTechId
}){
    const{
        register,
        handleSubmit,
        formState: {errors},
        formState
    } = useForm()

    const deleteTech = (id) => {
        useDelete(`/api/technologies/${id}`, setAllTech, id, setTechAction)
    }

    return(
        <form
            onSubmit={handleSubmit(() => deleteTech(id))}
        >
            <h2>
                Delete
                    <span> {tech_name}</span>
                ?
            </h2>

            <div>
                <button>
                    Delete
                </button>

                <button
                    onClick={() => {
                        setTechId(null)
                        setTechAction(null)
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}