import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useFetch } from "./useFetch"
import { PatchInput } from "./PatchInput"
import { FormGroup } from "./FormGroup"
import { DateInput } from "./DateInput"
import { usePatch } from "./usePatch"

export function AdminEditProject({
    projectId,
    setProjectAction,
    setAllProjects
}){
    const [project, setProject] = useState([])
    const [ongoingProject, setOngoingProject] = useState(true)
    const [loading, setLoading] = useState(false)

    useFetch(`/api/projects/${projectId}`, setProject)

    useEffect(() => {
        if(project && project.project_end_date){
            setOngoingProject(false)
        } else {
            setOngoingProject(true)
        }
    }, [project])

    console.log(project)

    const instituteStartDate = project?.institute?.institute_start_date
    const instituteEndDate = project?.institute?.institute_end_date

    console.log(instituteStartDate)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm()

    useEffect(() => {
        if (project && project.project_name) {
            reset({
            projectName: project.project_name,
            projectImg: project.project_img,
            projectVideo: project.project_video,
            projectStartDate: project.project_start_date,
            projectEndDate: project.project_end_date,
            projectIntro: project.project_intro,
            projectUrl: project.website_url,
            repoUrl: project.github_url
            })
        }
    }, [project, reset])

    // const projectStartDate = watch("projectStartDate")

    const onPatchProject = (formData) => {
        console.log(`I started this project on ${formData.projectStartDate}`)
        const updateData = {
            project_name: formData.projectName || project.project_name,
            project_img: formData.projectImg || project.project_img,
            project_video: formData.projectVideo || project.project_video,
            project_start_date: formData.projectStartDate || project.project_start_date,
            project_end_date: formData.projectEndDate || project.project_end_date,
            project_intro: formData.projectIntro || project.project_intro,
            website_url: formData.projectUrl || project.website_url,
            github_url: formData.repoUrl || project.github_url
        }

        usePatch(updateData, `/api/projects/${projectId}`, projectId, setAllProjects, setLoading, setProjectAction)
    }

    console.log(`I started this project on ${project?.project_start_date} which is type ${typeof project?.project_start_date}`)

    return(
        <form
            className="admin-instance-form"
            onSubmit={handleSubmit(onPatchProject)}
        >
            <h1>Edit Project</h1>

            <PatchInput 
                labelTitle={"Project Name: "}
                inputType={"text"}
                placeholder={"Please enter project name"}
                defaultValue={project?.project_name}
                register={register("projectName", {
                    required: project?.project_name ? false : "Please enter project name"
                })}
            />
            <FormGroup errorMessage={errors?.projectName?.message}/>

            <PatchInput 
                labelTitle={"Project Image: "}
                inputType={"text"}
                placeholder={"Please enter project image"}
                defaultValue={project?.project_img}
                register={register("projectImg")}
            />
            <FormGroup errorMessage={errors?.projectImg?.message}/>

            <PatchInput 
                labelTitle={"Project Video: "}
                inputType={"text"}
                placeholder={"Please enter project video"}
                defaultValue={project?.project_video}
                register={register("projectVideo")}
            />

            <PatchInput 
                labelTitle={"Project url"}
                inputType={"text"}
                placeholder={"Please enter the link to your app"}
                defaultValue={project?.website_url}
                register={register("projectUrl")}
            />

            <PatchInput 
                labelTitle={"Project repo link"}
                inputType={"text"}
                placeholder={"Please enter the link to your repo."}
                defaultValue={project?.github_url}
                register={register("repoUrl")}
            />

            <textarea 
                {...register("projectIntro")}
                className="institute-intro-text"
                placeholder="Please enter a project intro"
                defaultValue={project?.project_intro}
            />
            <FormGroup errorMessage={errors?.projectIntro?.message}/>

            <div
                className="institute-dates-container"
            >
                <h3>Start Date</h3>
                <DateInput 
                    defaultValue={project?.project_start_date}
                    placeholder={null}
                    register={register("projectStartDate", {
                        required: project?.project_start_date ? false : "Please enter value",
                        validate: value => {
                            console.log(`I started this project on ${value}`)

                            // Convert strings to Date objects
                            const start = new Date(value)
                            const instStart = instituteStartDate ? new Date(instituteStartDate) : null
                            const instEnd = instituteEndDate ? new Date(instituteEndDate) : null

                            if (instStart && instEnd){
                                if (start < instStart || start > instEnd){
                                    return `Project start date must be between ${instituteStartDate} and ${instituteEndDate}`
                                }
                            }

                            if(instStart && !instEnd && start < instStart){
                                return `Project must have started after ${instituteStartDate}`
                            }

                            return true
                        }
                    })}
                    original={project?.project_start_date}
                />

                <FormGroup errorMessage={errors?.projectStartDate?.message}/>
            </div>

            <div
                className="institute-dates-container"
            >
                <div
                    className="institute-end-date-specific"
                >
                    <h3>End Date</h3>

                    <div
                        className="ongoing-institute-container"
                    >
                        <input 
                            type="checkbox"
                            className="ongoing-institute-checkbox"
                            checked={ongoingProject}
                            onChange={e => setOngoingProject(e.target.checked)}
                        />

                        <p
                            className={!ongoingProject ? "completed-text" : null}
                        >
                            Project on-going
                        </p>

                        {ongoingProject ? null : <DateInput 
                            placeholder={null}
                            register={register("projectEndDate")}
                            original={project?.project_end_date}
                        />}
                    </div>
                </div>
            </div>

            <button>
                Submit
            </button>

            <button
                onClick={() => setProjectAction(null)}
            >
                Cancel
            </button>
        </form>
    )
}