import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"
import { useState } from "react"
import { usePost } from "./usePost"


export function AddTech({inputChange, allTech, setAllTech}){

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm()
    

    const onSubmit = (formData) => {
        usePost("/api/technologies", formData, allTech, setAllTech)
    }

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add New Tech</h1>
            {inputChange("text", "Enter new tech's name", {...register("techName", {
                required: "Tech name is required", 
                validate: value => {
                    const exists = allTech.some(
                        tech => tech.tech_name.toLowerCase() === value.toLowerCase()
                    )
                    return !exists || "This technology is already registered"
                }
            })})}
            <FormGroup errorMessage={errors?.techName?.message}/>

            {inputChange("text", "Enter new tech's image", {...register("techImg", {
                required: "Tech must have an image"})})}
            
            <FormGroup errorMessage={errors?.techImg?.message}/>
            <button>Create new Tech</button>
        </form>
    )
}

