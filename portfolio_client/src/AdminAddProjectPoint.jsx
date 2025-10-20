import { useForm } from "react-hook-form";
import { PostInput } from "./PostInput";
import { usePost } from "./usePost";

export function AdminAddProjectPoint({
    id,
    allPoints, setAllPoints,
    setProjectAction
}){
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (formData) => {
        formData.projectId = id

        usePost("/api/points", formData, allPoints, setAllPoints)
        setProjectAction(null)
    }
    return(
        <form
            className="admin-instance-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add A New Point</h1>

            <PostInput 
                labelTitle={"Enter project point: "}
                inputType={"text"}
                placeholder={"Enter project point"}
                additionalClassName={"project-point"}
                register={register("projectPoint", {
                    required: "Please enter project point"
                })}
            />

            <div
                className="admin-instance-button-container"
            >
                <button>Create Point</button>

                <button
                    onClick={() => setProjectAction(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}