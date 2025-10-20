import { useForm } from "react-hook-form";
import { usePost } from "./usePost";
import { PostInput } from "./PostInput";
import { DateInput } from "./DateInput";
import { useState } from "react";

export function AdminAddProject({
    allProjects, setAllProjects,
    allInstitutes, setProjectAction
}){
    const [ongoingProject, setOngoingProject] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (formData) => {
        if (ongoingProject){
            formData.projectEndDate = null
        }

        usePost("/api/projects", formData, allProjects, setAllProjects)
        setProjectAction(null)
    }

    return(
        <form
            className="add-new-project-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add Project</h1>

            <PostInput 
                labelTitle={"Project Name: "}
                inputType={"text"}
                placeholder={"Please enter project name"}
                additionalClassName={"new-project-name"}
                register={register("projectName", {
                    required: "Please enter a project name",
                    validate: value => {
                        const exists = allProjects.some(
                            project => project?.project_name?.toLowerCase() === value.toLowerCase()
                        )
                        return !exists || "Project name is already registered on the app."
                    }
                })}
            />

            <PostInput 
                labelTitle={"Project Image: "}
                inputType={"text"}
                placeholder={"Please enter project image"}
                additionalClassName={"new-project-image"}
                register={register("projectImg")}
            />

            <PostInput 
                labelTitle={"Project Video: "}
                inputType={"text"}
                placeholder={"Please enter link to video"}
                additionalClassName={"new-project-vid"}
                register={register("projectVideo")}
            />

            <PostInput 
                labelTitle={"GitHub Repo Link: "}
                inputType={"text"}
                placeholder={"Please enter link to GitHub repo"}
                additionalClassName={"new-project-git"}
                register={register("gitHubLink")}
            />

            <PostInput 
                labelTitle={"Website Url: "}
                inputType={"text"}
                placeholder={"Please enter website url"}
                additionalClassName={"new-project-url"}
                register={register("webUrl")}
            />

            <textarea 
                {...register("projectIntro")}
                className="project-intro-text"
                placeholder="Please enter project Intro"
            />

            <div
                className="project-additional-container"
            >
                <h3>Institute</h3>
                <select
                    defaultValue=""
                    {...register("instituteId")}
                    className="institute-select"
                >
                    <option
                        value=""
                        disabled
                    >
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
            </div>

            <div
                className="project-additional-container"
            >
                <h3>Start Date</h3>
                <DateInput 
                    placeholder={null}
                    register={register("projectStartDate")}                    
                />
            </div>

            <div
                className="project-additional-container"
            >
                <div
                    className="project-end-date-specific"
                >
                    <h3>End Date</h3>
                    <div
                        className="ongoing-project-container"
                    >
                        <input 
                            type="checkbox"
                            className="ongoing-project-checkbox"
                            checked={ongoingProject}
                            onChange={e => setOngoingProject(e.target.checked)}
                        />
                        <p
                            className={!ongoingProject ? "completed-text" : null}
                        >
                            Project On-going
                        </p>

                        {ongoingProject ? null : <DateInput 
                            placeholder={null}
                            register={register("projectEndDate")}
                        />}
                    </div>
                </div>
            </div>

            <div
                className="admin-post-button-container"
            >
                <button>Submit</button>

                <button
                    onClick={() => setProjectAction(null)}
                >Cancel</button>
            </div>
        </form>
    )
}