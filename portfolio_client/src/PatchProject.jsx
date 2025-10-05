import { useState } from "react"
import { useFetch } from "./useFetch"
import { usePatch } from "./usePatch"
import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"

export function PatchProject({
    id, backend, frontend, 
    institute, institute_id, project_end_date, 
    project_img, project_intro, project_name, project_start_date, project_video,
    editProject, setEditProject, inputChange, dateInput, setAllProjects
}){
    const [allInstitutes, setAllInstitutes] = useState([])
    const [projectFinished, setProjectFinished] = useState(project_end_date? true : false)
    useFetch("/api/institutes", setAllInstitutes)

    console.log("This porject has been finished", projectFinished)

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        defaultValues: {
            projectName: project_name,
            projectImg: project_img,
            projectVideo: project_video,
            projectIntro: project_intro,
            projectStart: project_start_date,
            projectEnd: !projectFinished? project_end_date : null,
            instituteId: parseInt(institute_id, 10)
        }
    })
    const instituteId = watch("instituteId")
    console.log(`Selected institite ${instituteId}`)

    const chosenInstitute = allInstitutes?.filter(institute => institute.id === Number(instituteId))

    const instituteStart = chosenInstitute?.[0]?.institute_start_date
    const instituteEnd = chosenInstitute?.[0]?.institute_end_date

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
            editBody, `/api/projects/${id}`,
            parseInt(id, 10), setEditProject, setAllProjects
        )
    }

    return(
        <form
            onSubmit={handleSubmit(handleEdit)}
        >
            <h1>Edit {project_name}</h1>
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
        </form>
    )
}