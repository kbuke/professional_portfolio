import { useForm } from "react-hook-form"
import { usePost } from "./usePost"
import { FormGroup } from "./FormGroup"

export function AddSocials({
    setSocialAction,
    allSocials,
    setAllSocials,
    postInput
}){

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmitSocial = (formData) => {
        usePost("/api/socials", formData, allSocials, setAllSocials, setSocialAction)
    }

    return(
        <form
            id="add-socials-form"
            onSubmit={handleSubmit(onSubmitSocial)}
        >
            <h1>Add New Social Media</h1>

            {postInput("Social Media Platform", "text", "Please enter social media platform", "post-new_social-media", {...register("socialName", {
                required: "Please enter social-media name",
                validate: value => {
                    const exists = allSocials.some(
                        socials => socials?.name?.toLowerCase() === value.toLowerCase()
                    )
                    return !exists || "Social is already registered on app."
                }
            })})}
            <FormGroup errorMessage={errors?.socialName?.message} />

            {postInput("Social Media Link", "text", "Please enter a link for the social media profile", "post-new_social-media", {...register("socialLink", {
                required: "Please enter a link for the image"
            })})}
            <FormGroup errorMessage={errors?.socialLink?.message} />

            {postInput("Social Media Image", "text", "Please enter a link for the logo of the social-media", "post-new_social-media", {...register("socialImg", {
                required: "Please enter a link for the image"
            })})}
            <FormGroup errorMessage={errors?.socialImg?.message} />

            <div>
                <button>Submit</button>
                <button
                    onClick={() => setSocialAction(null)}
                >Cancel</button>
            </div>
        </form>
    )
}