import { useState } from "react";
import { useFetch } from "./useFetch";
import { PatchUserInfo } from "./PatchUserInfo";
import { AddEmail } from "./AddEmail";


export function IntroSection({
    inputChange
}){
    const [allUsers, setAllUsers] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [sendEmail, setSendEmail] = useState(false)

    useFetch("/api/users", setAllUsers)
    
    const userInfo = allUsers[0]
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

                    <button
                        onClick={() => setSendEmail(true)}
                    >
                        Email
                    </button>
                </div>

                <button
                    onClick={() => setEditUser(userInfo)}
                >
                    Edit User Info
                </button>

                {editUser ?
                    <PatchUserInfo
                        inputChange={inputChange} 
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                        setEditUser={setEditUser}
                        {...editUser}
                    />
                    :
                    null
                }

                {sendEmail?
                    <AddEmail 
                        inputChange={inputChange}
                        setSendEmail={setSendEmail}
                    />
                    :
                    null
                }

            </div>
    )

}