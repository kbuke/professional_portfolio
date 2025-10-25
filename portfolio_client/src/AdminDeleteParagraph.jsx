import { useForm } from "react-hook-form"
import { useDelete } from "./useDelete"

export function AdminDeleteParagraph({
    id,
    setParagraphAction,
    setAllParagraph
}){

    

    // console.log(`Deleting paragraph ${id}`)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const deleteParagraph = (id) => {
        useDelete(`/api/paragrahps/${id}`, setAllParagraph, id, setParagraphAction)
        setParagraphAction(null)
    }

    return(
        <form
            onSubmit={handleSubmit(() => deleteParagraph(id))}
        >
            <h1>Delete Paragraph?</h1>
            <button>Delete</button>
            <button
                onClick={() => setParagraphAction(null)}
            >Cancel</button>
        </form>
    )
}