import { useForm } from "react-hook-form";
import { usePost } from "./usePost";
import { FormGroup } from "./FormGroup";
import { useFetch } from "./useFetch";
import { useState } from "react";

export function AddProject({
    inputChange,
    allProjects, 
    setAllProjects,
    dateInput
}){
    const [allInstitutes, setAllInstitutes] = useState([]) 
    useFetch("/api/institutes", setAllInstitutes)
    console.log(allInstitutes)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (formData) => {
        console.log(formData)
        usePost("/api/projects", formData, allProjects, setAllProjects)
    }

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add New Project</h1>
            {inputChange("text", "Enter new project's name", {...register("projectName", {
                required: "Please enter a project name.",
                validate: value => {
                    const exists = allProjects.some(
                        project => project?.project_name?.toLowerCase() === value.toLowerCase()
                    )
                    return !exists || `Project name is already registered on app.`
                }
            })})}

            {inputChange("text", "Enter new project image", {...register("projectImg")})}
            {/* <FormGroup errorMessage={errors?.projectImg.message}/> */}

            {inputChange("text", "Enter new project video", {...register("projectVideo")})}

            {dateInput("Project start date:", {...register("projectStartDate")})}

            {dateInput("Project end date:", {...register("projectEndDate")})}

            <textarea 
                {...register("projectIntro")}
            />

            <select
                {...register("instituteId")}
            >
                <option value="" disabled>
                    Please select institute
                </option>

                {allInstitutes.map((institute, index) => {
                    return(
                        <option
                            key={index}
                            value={institute.id}
                        >
                            {institute.institute_name}
                        </option>
                    )
                })}
            </select>

            <button>Create Project</button>
        </form>
    )
}