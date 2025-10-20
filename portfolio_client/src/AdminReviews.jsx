import { useState } from "react"
import { AdminDeleteProject } from "./AdminDeleteProject"
import { AdminDeleteReview } from "./AdminDeleteReview"

export function AdminReviews({
    name, place_of_relation, review, id, setAllReviews
}){
    const [deleteReview, setDeleteReview] = useState(false)
    const [reviewId, setReviewId] = useState(null)

    return(
        <div
            className="admin-review-option-grid"
        >
            <div
                className="admin-review-block"
            >
                <h3
                    className="admin-instance-title"
                >
                    {name} | {place_of_relation}
                </h3>

                <p>
                    {review}
                </p>
            </div>

            <button
                className="admin-project-button admin-delete-button"
                onClick={() => {
                    setDeleteReview(true)
                    setReviewId(id)
                }}
            >
                Delete Review
            </button>

            {deleteReview && reviewId === id ?
                <AdminDeleteReview 
                    name={name}
                    id={id}
                    setAllReviews={setAllReviews}
                    setDeleteReview={setDeleteReview}
                    setReviewId={setReviewId}
                />
                :
                null
            }
        </div>
    )
}