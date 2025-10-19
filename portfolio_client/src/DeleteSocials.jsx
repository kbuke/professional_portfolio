import { useState } from "react"
import { useDelete } from "./useDelete"

export function DeleteSocials({
    allSocials,
    setAllSocials,
    setSocialAction
}){
    const [socialsId, setSocialsId] = useState(null)

    const handleDelete = (e, id) => {
        console.log("tyring to delete socials", id)
        useDelete(e, `/api/socials/${id}`, setAllSocials, id, setSocialAction)
    }

    return(
        <div>
            {allSocials.map((socials, index) => {
                return(
                    <div key={index}>
                        <p>{socials.name}</p>

                        <button
                            onClick={e => {
                                handleDelete(e, socials.id)
                            }}
                        >
                            Confirm Deletion
                        </button>
                    </div>
                )
            })}
        </div>
    )
}