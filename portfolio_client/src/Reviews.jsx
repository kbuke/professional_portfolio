import { RenderReviews } from "./RenderReviews"

export function Reviews({
    allReviews,
    setAllReviews
}){
    return(
        <div
            className="review-section-container"
        >
            <h1
                className="section-heading"
            >
                Reviews
            </h1>

            <div
                className="review-div-flex"
            >
                {allReviews.map((review, index) => {
                    return(
                        <RenderReviews 
                            key={index}
                            {...review}
                        />
                    )
                })}
            </div>

            <button
                className="project-info-button review-button"
            >
                <span>
                    Write a Review
                </span>
            </button>
        </div>
    )
}