import { useForm } from "react-hook-form";
import { useDelete } from "./useDelete";

export function AdminDeleteReview({
    name, id,
    setAllReviews,
    setDeleteReview, setReviewId
}){
    console.log(`looking at ${id}`)
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const deleteReview = (id) => {
        console.log(`deleting ${id}`)
        useDelete(`/api/reviews/${id}`, setAllReviews, id, setDeleteReview)
    }

    return(
        <form
            onSubmit={handleSubmit(() => deleteReview(id))}
        >
            <h2>Delete 
                <span> {name}</span>
            ?
            </h2>

            <div>
                <button>
                    Delete
                </button>

                <button
                    onClick={() => {
                        setDeleteReview(null)
                        setReviewId(null)
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}