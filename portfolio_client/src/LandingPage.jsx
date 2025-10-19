import { RenderTech } from "./RenderTech";


export function LandingPage({
    user_img, first_name, last_name, user_intro
}){
    return(
        <div
            className="landing-pg-div"
            style={{backgroundImage: `url(${user_img})`}}
        >
            <div
                className="landing-page-intro-container"
            >
                <h1
                    className="account_name"
                >
                    {first_name} {last_name}
                </h1>
                <div
                    className="user-info-grid"
                >
                    <h3
                        className="user-intro-text"
                    >
                        {user_intro}
                    </h3>

                    <>
                        <RenderTech />
                    </>
                </div>
            </div>
        </div>
    )
}