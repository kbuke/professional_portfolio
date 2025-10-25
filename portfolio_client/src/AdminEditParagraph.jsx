import { useForm } from "react-hook-form";
import { PatchInput } from "./PatchInput";
import { useState } from "react";
import { usePatch } from "./usePatch";

export function AdminEditParagraph({
    paragraph,
    paragraphImg1,
    paragraphImg2,
    paragraphId,
    setAllParagraph,
    setParagraphAction,
    projectId
}){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const [loading, setLoading] = useState(false)

    const onPatchParagraph = (formData) => {
        const updatedData = {
            paragraph: formData.paragraph,
            paragraph_img_1: formData.paragraphImg1,
            paragraph_img_2: formData.paragraphImg2,
            project_id: projectId
        }
        usePatch(updatedData, `/api/paragrahps/${paragraphId}`, paragraphId, setAllParagraph, setLoading, setParagraphAction)
        setParagraphAction(null)
    }

    return(
        <form
            className="admin-instance-form"
            onSubmit={handleSubmit(onPatchParagraph)}
        >
            <textarea 
                className="institute-intro-text"
                placeholder="Please enter paragraph"
                defaultValue={paragraph}
                {...register("paragraph")}
            />

            <PatchInput 
                labelTitle={"Please enter image 1"}
                inputType={"text"}
                placeholder={"Please enter img 1"}
                defaultValue={paragraphImg1}
                register={register("paragraphImg1")}
            />

            <PatchInput 
                labelTitle={"Please enter image 2"}
                inputType={"text"}
                placeholder={"Please enter img 2"}
                defaultValue={paragraphImg2}
                register={register("paragraphImg2")}
            />

            <div
                className="admin-post-button-container"
            >
                <button>
                    Edit
                </button>

                <button
                    onClick={() => setParagraphAction(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}