import { useForm } from "react-hook-form"
import { usePatch } from "./usePatch"
import { FormGroup } from "./FormGroup"

export function PatchUserInfo({
    inputChange,
    allUsers, 
    setAllUsers,
    setEditUser,
    user_img,
    user_cv,
    email,
    first_name,
    last_name,
    user_intro,
    id
}){
    const {
        register, 
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        defaultValues:{
            userImg: user_img,
            userCv: user_cv,
            email: email,
            firstName: first_name,
            lastName: last_name,
            userIntro: user_intro
        }
    })

    const editBody = {
        user_img: watch("userImg"),
        user_cv: watch("userCv"),
        email: watch("email"),
        first_name: watch("firstName"),
        last_name: watch("lastName"),
        user_intro: watch("userIntro")
    }

    const handleEmailEdit = () => {
        usePatch(
            editBody, `/api/users/${id}`,
            id, setEditUser, setAllUsers
        )
    }
    
    return(
        <form
            onSubmit={handleSubmit(handleEmailEdit)}
        >
            <h1>Edit User Info</h1>
            
            {inputChange("text", "Please enter first name", {...register("firstName", {
                required: "Please enter your name (Kaan)"
            })})}
            <FormGroup errorMessage={errors?.firstName?.message}/>

            {inputChange("text", "Please enter last name", {...register("lastName", {
                required: "Please enter your last name (Buke)"
            })})}
            <FormGroup errorMessage={errors?.lastName?.message}/>
            
            {inputChange("text", "Please enter link to your image", {...register("userImg", {
                required: "Please enter link to your image"
            })})}
            <FormGroup errorMessage={errors?.userImg?.message}/>

            {inputChange("text", "Please enter link to cv", {...register("userCv", {
                required: "Please enter a link for your CV"
            })})}
            <FormGroup errorMessage={errors?.userCv?.message}/>

            {inputChange("email", "Please enter your email address", {...register("email", {
                required: "Please enter your email address"
            })})}
            <FormGroup errorMessage={errors?.email?.message}/>

            <textarea 
                placeholder="Enter information about yourself"
                {...register("userIntro", {
                    required: "Please enter some information about yourself."
                })}
            />
            <FormGroup errorMessage={errors?.userIntro?.message}/>

            <button>Submit</button>

            <button
                onClick={() => setEditUser(false)}
            >
                Cancel
            </button>
        </form>
    )
}