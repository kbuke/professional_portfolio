import { useForm } from "react-hook-form";
import { PostInput } from "./PostInput";
import { usePost } from "./usePost";

export function AdminAddProjectParagrapgh({
    projectId,
    allParagraphs, 
    setAllParagraph,
    setProjectAction
}){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (formData) => {
        formData.projectId=projectId

        usePost("/api/paragrahps", formData, allParagraphs, setAllParagraph)
        setProjectAction(null)
    }

    return(
        <form
            className="add-project-tech-div"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add New Paragraph</h1>

            <PostInput 
                labelTitle={"Paragraph Title"}
                inputType={"text"}
                placeholder={"Please enter paragraph title"}
                additionalClassName={"new-para-title"}
                register={register("paragraphTitle")}
            />

            <textarea 
                placeholder="Please enter paragraph"
                {...register("paragraph")}
                className="institute-intro-text"
            />

            <PostInput 
                labelTitle={"Enter paragraph img"}
                inputType={"text"}
                placeholder={"Please enter paragraph image"}
                additionalClassName={"new-para-title"}
                register={register("paraImg1")}
            />

            <PostInput 
                labelTitle={"Enter paragraph second img"}
                inputType={"text"}
                placeholder={"Please enter paragraph second image"}
                additionalClassName={"new-para-title"}
                register={register("paraImg2")}
            />

            <div>
                <button>
                    Add Paragraph
                </button>

                <button
                    onClick={() => setProjectAction(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}