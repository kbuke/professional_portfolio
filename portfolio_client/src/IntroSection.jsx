import { useFetch } from "./customHooks/useFetch";

export function IntroSection(){
    const userDetails = useFetch("http://127.0.0.1:5555/users")
    console.log(userDetails)
    const user = userDetails?.data
    console.log(user)
    
    const render_user_details = user?.map(info => {
        return(
            <div
                style={{backgroundColor:"green"}}
            >
                <h1>{info.first_name} {info.last_name}</h1>

                <h3>
                    {info.user_intro}
                </h3>
            </div>
        )
    })

    return(
        <div>
            {render_user_details}
        </div>
    )
}