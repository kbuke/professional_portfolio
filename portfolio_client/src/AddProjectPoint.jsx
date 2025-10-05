import { useEffect, useState } from "react"
import { useFetch } from "./useFetch"
import { usePost } from "./usePost"
import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"


export function AddProjectPoint({
    addProjectPoint,
    setAddProjectPoint,
    inputChange,
    allPoints,
    setAllPoints
}){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const handlePostPoint = (formData) => {
        const completeData = {
            ...formData,
            projectId: addProjectPoint
        }
        console.log(completeData)
        usePost("/api/points", completeData, allPoints, setAllPoints)
    }

    return(
        <form
            onSubmit={handleSubmit(handlePostPoint)}
        >
            <h1>Add Project Point</h1>

            {inputChange("text", "Enter new point for project.", {...register("projectPoint", {
                required: "Please enter a project point."
            })})}
            <FormGroup errorMessage={errors?.projectPoint?.message}/>

            <button>Submit</button>

            <button
                onClick={() => setAddProjectPoint(null)}
            >
                Cancel
            </button>
        </form>
    )
}