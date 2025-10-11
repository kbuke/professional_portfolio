import { useState } from "react";
import { useFetch } from "./useFetch";
import { useForm } from "react-hook-form";
import { usePost } from "./usePost";
import { FormGroup } from "./FormGroup";
import { postEmail } from "./PostData";

export function AddEmail({
    inputChange,
    setSendEmail,
    isLoading,
    setIsLoading,
    sentEmail,
    setSentEmail
}){
    const [allEmails, setAllEmails] = useState([])
    const [sendingEmail, setSendingEmail] = useState(false)
    useFetch("/api/emails", setAllEmails)

    console.log("I have sent an email", sentEmail)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const handleEmailSubmit = (formData) => {
        postEmail("/api/emails", formData, allEmails, setAllEmails, setIsLoading, setSentEmail, setSendingEmail)
    }

    return(
        sentEmail ?
            <div>
                <h2>Email Sent</h2>
                <p>I will get back to you as soon as possible, if you would like to send another Please 
                    <span style={{fontWeight: "bold"}}> refresh </span>
                    the page.
                </p>
                <button onClick={() => setSendEmail(false)}>Close</button>
            </div>
            :
            isLoading && sendingEmail?
                <h1>Sending Email...</h1>
                :
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