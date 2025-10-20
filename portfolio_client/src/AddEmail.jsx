import { useState } from "react"
import { useFetch } from "./useFetch"
import { useForm } from "react-hook-form"
import { FormGroup } from "./FormGroup"
import { postEmail } from "./PostEmail"
import { PostInput } from "./PostInput"

export function AddEmail({
  // postInput,
  sentEmail,
  setSentEmail,
}) {
  const [allEmails, setAllEmails] = useState([])
  const [sendingEmail, setSendingEmail] = useState(false)

  useFetch("/api/emails", setAllEmails)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleEmailSubmit = (formData) => {
    postEmail(
      "/api/emails",
      formData,
      allEmails,
      setAllEmails,
      setSendingEmail,
      setSentEmail
    )
  }

  return sentEmail ? (
    <div className="sent-email-container">
      <h1>Email Sent!</h1>
      <p>
        I'll get back to you asap, if you need to send another please refresh
        the page.
      </p>
    </div>
  ) : sendingEmail ? (
    <div>
      <h3>Sending Email...</h3>
    </div>
  ) : (
    <form onSubmit={handleSubmit(handleEmailSubmit)} id="send-email-form">
      <PostInput
        labelTitle="Email Subject:"
        inputType="text"
        placeholder="Please enter email subject"
        additionalClassName="new-email-input"
        register={register("emailSubject", {
          required: "Please enter the subject of the email",
        })}
      />
      <FormGroup errorMessage={errors?.emailSubject?.message} />

      <PostInput
        labelTitle="Your Email Address:"
        inputType="email"
        placeholder="Please enter your email address"
        additionalClassName="new-email-input"
        register={register("senderEmail", {
          required: "Please enter your email address",
        })}
      />
      <FormGroup errorMessage={errors?.senderEmail?.message} />

      <textarea
        placeholder="Please enter your email message"
        {...register("emailMessage", {
          required: "Please enter your message.",
        })}
        className="email-message-text-area"
      />
      <FormGroup errorMessage={errors?.emailMessage?.message} />

      <button className="send-email-button">
        <span className="email-button-span"></span>
        Send Email
      </button>
    </form>
  )
}
