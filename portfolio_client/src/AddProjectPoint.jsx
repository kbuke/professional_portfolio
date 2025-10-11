import { useEffect, useState } from "react"
import { useFetch } from "./useFetch"
import { usePost } from "./usePost"
import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"


export function AddProjectPoint({
    selectedProjectId,
    setSelectedProjectId,
    setProjectAction,
    inputChange,
    allPoints,
    setAllPoints
    // addProjectPoint,
    // setAddProjectPoint,
    // inputChange,
    // allPoints,
    // setAllPoints
}){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const handlePostPoint = (formData) => {
        const completeData = {
            ...formData,
            projectId: selectedProjectId
        }
        console.log(completeData)
        usePost("/api/points", completeData, allPoints, setAllPoints, setProjectAction, setSelectedProjectId)
    }

    return(
        <form
            onSubmit={handleSubmit(handlePostPoint)}
            className="form"
        >
            <h1>Add Project Point</h1>

            {inputChange("text", "Enter new point for project.", {...register("projectPoint", {
                required: "Please enter a project point."
            })})}
            <FormGroup errorMessage={errors?.projectPoint?.message}/>

            <button>Submit</button>

            <button
                // onClick={() => setAddProjectPoint(null)}
                onClick={() => setProjectAction(null)}
            >
                Cancel
            </button>
        </form>
    )
}