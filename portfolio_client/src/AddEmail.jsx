import { useState } from "react";
import { useFetch } from "./useFetch";
import { useForm } from "react-hook-form";
import { usePost } from "./usePost";
import { FormGroup } from "./FormGroup";

export function AddEmail({
    inputChange,
    setSendEmail
}){
    const [allEmails, setAllEmails] = useState([])
    useFetch("/api/emails", setAllEmails)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const handleEmailSubmit = (formData) => [
        usePost("/api/emails", formData, allEmails, setAllEmails)
    ]

    return(
        <form
            onSubmit={handleSubmit(handleEmailSubmit)}
        >
            <h1>Send me an Email</h1>

            {inputChange("text", "Please enter email subject", {...register("emailSubject", {
                required: "Please enter email subject"
            })})}
            <FormGroup errorMessage={errors?.emailSubject?.message}/>

            {inputChange("email", "Please enter your email address", {...register("senderEmail", {
                required: "Please enter your email address."
            })})}
            <FormGroup errorMessage={errors?.senderEmail?.message}/>

            <textarea 
                placeholder="Enter email message."
                {...register("emailMessage", {
                    required: "Please enter your message"
                })}
            />
            <FormGroup errorMessage={errors?.emailMessage?.message}/>

            <button>
                Submit
            </button>

            <button
                onClick={() => setSendEmail(false)}
            >
                Cancel
            </button>
        </form>
    )
}