export function RenderReviews({
    image, name, place_of_relation, position, rating, review
}){
    const stars = Array(5).fill(0);

    return(
        <div
            className="review-card"
        >
            <div
                className="reviewer-info-grid"
            >
                <img 
                    src={image}
                    alt={`${name} image`}
                    className="review-user-img"
                />

                <p
                    className="reviewer-name"
                >
                    {name}
                </p>
            </div>

            <p
                className="reviewer-relation"
            >
                <span
                    className="relation-span"
                >{position} </span>
                @ 
                <span
                    className="relation-span"
                > {place_of_relation}</span>
            </p>

            <div
                className="review-stars"
            >
                {stars.map((_, index) => {
                    return(
                        <span
                            key={index}
                            className={`star ${index < rating ? "filled" : ""}`}
                        >
                           ★ 
                        </span>
                    )
                })}

                <p
                    className="review-text"
                >
                    {review}
                </p>
            </div>
        </div>
    )
}