import { useState } from "react"
import { useFetch } from "./useFetch"
import { usePatch } from "./usePatch"
import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"
import { useEffect } from "react"

export function PatchProject({
    selectedProjectId, setProjectAction, inputChange, dateInput, setAllProjects
}){
    const [allInstitutes, setAllInstitutes] = useState([])
    const [chosenProject, setChosenProject] = useState([])

    useFetch("/api/institutes", setAllInstitutes)
    useFetch(`/api/projects/${selectedProjectId}`, setChosenProject)
    console.log(chosenProject)

    const [projectFinished, setProjectFinished] = useState(chosenProject?.project_end_date? true : false)

    const{
        register,
        handleSubmit,
        formState: {errors},
        watch,
        reset
    } = useForm()

    useEffect(() => {
        if (chosenProject && chosenProject.project_name) {
            reset({
                projectName: chosenProject.project_name,
                projectImg: chosenProject.project_img,
                projectVideo: chosenProject.project_video,
                projectIntro: chosenProject.project_intro,
                projectStart: chosenProject.project_start_date,
                projectEnd: chosenProject.project_end_date || null,
                instituteId: parseInt(chosenProject.institute_id, 10)
            });
        }
    }, [chosenProject, reset]);


    const institueId = watch("instituteId")

    const instituteStart = chosenProject?.institute?.institute_start_date
    const instituteEnd = chosenProject?.institute?.institute_end_date

    const projectStart = watch("projectStart")

    const editBody = {
        project_name: watch("projectName"),
        project_img: watch("projectImg"),
        project_video: watch("projectVideo"),
        project_start_date: watch("projectStart"),
        project_end_date: watch("projectEnd"),
        project_intro: watch("projectIntro"),
        institute_id: Number(watch("instituteId"))
    }

    const handleEdit = () => {
        usePatch(
            editBody, `/api/projects/${selectedProjectId}`,
            parseInt(selectedProjectId, 10), setProjectAction, setAllProjects
        )
    }

    return(
        <form
            onSubmit={handleSubmit(handleEdit)}
        >
            <h1>Edit {chosenProject?.project_name}</h1>
            {inputChange("text", "Please enter project name", {...register("projectName")})}
            {inputChange("text", "Please enter project image", {...register("projectImg")})}
            {inputChange("text", "Please enter project video", {...register("projectVideo")})}
            {inputChange("text", "Please enter project intro", {...register("projectIntro")})}

    

            {dateInput("Project Start Date:", {...register("projectStart", {
                required: "Please enter the project start date",
                validate: value => {
                    if(instituteStart && instituteEnd){
                        if(value < instituteStart || value > instituteEnd){
                            return `Start date must be between ${instituteStart} and ${instituteEnd}`
                        }
                    }
                    else if(value < instituteStart){
                        return (`Project must have started on, or after ${instituteStart}`)
                    }
                }
            })})}
            <FormGroup errorMessage={errors?.projectStart?.message}/>

            <>
                <p>Project Finished?</p>
                <input 
                    type="checkbox"
                    checked={projectFinished}
                    onChange={() => setProjectFinished(!projectFinished)}
                />
            </>

            {projectFinished ?
                <div>
                    {dateInput("Project End Date:", {...register("projectEnd", {
                        validate: value => {
                            if(projectFinished){
                                if (instituteEnd && projectStart && (value < projectStart) || value > instituteEnd){
                                    return(`Value must be between ${projectStart} and ${instituteEnd}`)
                                } else if (projectStart && !instituteEnd && value < projectStart){
                                    return (`Value must be after ${projectStart}`)
                                }
                            }
                        }
                    })})}
                    <FormGroup errorMessage={errors?.projectEnd?.message}/>
                </div>
                :
                null
            }

            <select
                {...register("instituteId")}
            >
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

            <button>Submit</button>

            <button
                onClick={() => setProjectAction(null)}
            >Cancel</button>
        </form>
    )
}