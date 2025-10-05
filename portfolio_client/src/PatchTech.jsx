import { useState } from "react"
import { usePatch } from "./usePatch"
import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"

export function PatchTech({
    id, 
    tech_name,
    tech_img,
    editInstance,
    setEditInstance,
    setAllTech,
    inputChange,
    allTech
}){
    
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        defaultValues:{
            techName: tech_name,
            techImg: tech_img
        }
    })

    const editBody = {
        tech_name: watch("techName"),
        tech_img: watch("techImg")
    }

    const handleTechEdit = () => {
        usePatch(
            editBody, `/api/technologies/${id}`,
            id, setEditInstance, setAllTech
        )
    }

    return(
        <form
            onSubmit={handleSubmit(handleTechEdit)}
        >
            <h1>Edit {tech_name}</h1>
            {inputChange("text", "Please enter tech name", {...register("techName",{
                required: "Please enter a tech name",
                validate: value => {
                    const exists = allTech.some(
                        tech => tech.tech_name.toLowerCase() === value.toLowerCase()
                    )
                    return !exists || "This technology is already registered on the app."
                }
            })})}
            <FormGroup errorMessage={errors?.techName?.message}/>
            
            {inputChange("tect", "Please enter tech image", {...register("techImg", {
                required: "Please enter a tech image link"
            })})}
            <FormGroup errorMessage={errors?.techImg?.message} />

            <button>
                Submit
            </button>

            <button
                onClick={() => setEditInstance(null)}
            >
                Cancel
            </button>
        </form>
    )
}