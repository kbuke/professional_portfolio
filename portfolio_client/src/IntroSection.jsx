import { useState } from "react";
import { useFetch } from "./useFetch";


export function IntroSection(){
    const [allUsers, setAllUsers] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useFetch("/api/users", setAllUsers)
    
    const userInfo = allUsers[0]
    console.log(userInfo)
    const userImg = userInfo?.user_img 
    const userCv = userInfo?.user_cv
    const userEmail = userInfo?.email 
    const userName = `${userInfo?.first_name} ${userInfo?.last_name}`
    const userIntro = userInfo?.user_intro



    return(
        isError ?
            <h1>Error Fetching User Intro</h1>
            :
            <div>
                <>
                    <img src={userImg}/>
                </>

                <div>
                    <h1>{userName}'s Portfolio</h1>
                    <h3>{userIntro}</h3>
                    <button>CV</button>
                    <button>Email</button>
                </div>

            </div>
    )

}