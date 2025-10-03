import { useState } from "react"
import { usePatch } from "./usePatch"

export function PatchTech({
    editInstance,
    setEditInstance,
    setAllTech
}){
    const [techName, setTechName] = useState(editInstance?.tech_name)
    const [techImg, setTechImg] = useState(editInstance?.tech_img)

    const editBody = {
        tech_name: techName,
        tech_img: techImg
    }

    const handleEdit = (e) => {
        usePatch(
            e, editBody, `/api/technologies/${editInstance.id}`,
            parseInt(editInstance.id, 10), editInstance, setEditInstance, setAllTech
        )
    }

    return(
        <div>
            <h1>Edit Tech</h1>
            <input 
                type="text"
                placeholder="Edit tech name"
                value={techName}
                onChange={e => setTechName(e.target.value)}
            />

            <input 
                type="text"
                placeholder="Edit tech img"
                value={techImg}
                onChange={e => setTechImg(e.target.value)}
            />

            <div>
                <button
                    onClick={e => handleEdit(e)}
                >
                    Make Edits
                </button>

                <button
                    onClick={() => setEditInstance(null)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}