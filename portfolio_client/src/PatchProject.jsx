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
    useFetch("/api/institutes", setAllInstitutes)

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
            projectEnd: project_end_date,
            instituteId: parseInt(institute_id, 10)
        }
    })
    const instituteId = watch("instituteId")
    console.log(`Selected institite ${instituteId}`)
    console.log(allInstitutes)

    const chosenInstitute = allInstitutes?.filter(institute => institute.id === Number(instituteId))
    console.log(chosenInstitute)

    const instituteStart = chosenInstitute?.[0]?.institute_start_date
    const instituteEnd = chosenInstitute?.[0]?.institute_end_date
    console.log(instituteStart)

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

            {dateInput("Project End Date:", {...register("projectEnd")})}
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

    
    // console.log(inputChange)
    // const [projectName, setProjectName] = useState(project_name)
    // const [institution, setInstitution] = useState(institute.institute_name)
    // const [instituteId, setInstituteId] = useState(parseInt(institute_id, 10))
    // const [projectStart, setProjectStart] = useState(project_start_date)
    // const [projectEnd, setProjectEnd] = useState(project_end_date)
    // const [projectImg, setProjectImg] = useState(project_img)
    // const [projectIntro, setProjectIntro] = useState(project_intro)
    // const [projectVideo, setProjectVideo] = useState(project_video)
    // const [institutes, setInstitutes] = useState([])

    // useFetch("/api/institutes", setInstitutes)
    // // Create drop box for institutes
    // const instituteDropDown = () => {
    //     return (
    //         <select
    //             onChange={e => setInstituteId(parseInt(e.target.value, 10))}
    //         >
    //             {institutes.map((options, index) => {
    //                 return(
    //                     <option
    //                         value={options.id}
    //                         key={index}
    //                     >
    //                         {options.institute_name}
    //                     </option>
    //                 )
    //             })}
    //         </select>
    //     )
    // }

    // console.log(setEditProject)
    // console.log(setAllProjects)

    // const editInput = (inputType, placeholder, value, setState) => {
    //     return(
    //         <input 
    //             type={inputType}
    //             placeholder={placeholder}
    //             value={value? value : ""}
    //             onChange={e => setState(e.target.value)}
    //         />
    //     )
    // }

    // const editBody = {
    //     project_name: projectName,
    //     project_img: projectImg,
    //     project_video: projectVideo,
    //     project_start_date: projectStart,
    //     project_end_date: projectEnd || null,
    //     project_intro: projectIntro,
    //     institute_id: parseInt(instituteId, 10)
    // }

    // const handleEdit = e => {
    //     usePatch(
    //         e, editBody, `/api/projects/${id}`,
    //         parseInt(id, 10), setEditProject, setAllProjects
    //     )
    // }

    // return(
    //     <div>
    //         <h1>Edit {project_name}</h1>
    //         {editInput(
    //             "text", 
    //             "Please enter project name",
    //             projectName,
    //             setProjectName
    //         )}

    //         {editInput(
    //             "text",
    //             "Please enter project image",
    //             projectImg,
    //             setProjectImg
    //         )}

    //         {editInput(
    //             "text",
    //             "Please enter project video",
    //             projectVideo,
    //             setProjectVideo
    //         )}

    //         {editInput(
    //             "text",
    //             "Please enter project introduction",
    //             projectIntro, 
    //             setProjectIntro
    //         )}

    //         {instituteDropDown()}

    //         {editInput(
    //             "date",
    //             "Start date",
    //             projectStart,
    //             setProjectStart
    //         )}

    //         {editInput(
    //             "date",
    //             "End date",
    //             projectEnd,
    //             setProjectEnd
    //         )}

    //         <button
    //             onClick={e => handleEdit(e)}
    //         >
    //             Make Changes
    //         </button>

    //         <button
    //             onClick={() => setEditProject(null)}
    //         >
    //             Cancel
    //         </button>
    //     </div>
    // )
}