import { useForm } from "react-hook-form"
import { usePost } from "./usePost"
import { FormGroup } from "./FormGroup"

export function AddInstitute({
    allInstitutes, setAllInstitutes,
    inputChange, dateInput
}){
    const {
        register,
        handleSubmit,
        formState: {errors}, 
        watch,
        reset
    } = useForm()

    const onSubmit = (formData) => {
        usePost("/api/institutes", formData, allInstitutes, setAllInstitutes)
        
    }

    //Use this for validation to ensure end-date doesnt come before.
    const instituteStartDate = watch("instituteStartDate") // WATCH let's us subscribe to the value of a field 

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add an Institute</h1>
            {inputChange("text", "Enter Institute's name", {...register("instituteName", {
                required: "Please enter the Institute's name.",
                validate: value => {
                    const exists = allInstitutes.some(
                        institute => institute?.institute_name?.toLowerCase() === value.toLowerCase()
                    )
                    return !exists || "Institute name is already registered on this app."
                }
            })})}
            <FormGroup errorMessage={errors?.instituteName?.message}/>

            {inputChange("text", "Enter Institute's image", {...register("instituteImg", {
                required: "Please enter the Institute's image."
            })})}
            <FormGroup errorMessage={errors?.instituteImg?.message} />

            <textarea placeholder="Enter Institute Intro" {...register("instituteIntro", {
                required: "Please enter an intro for the institute."
            })}/>
            <FormGroup errorMessage={errors?.instituteIntro?.message} />

            {dateInput("Institute Start Date:", {...register("instituteStartDate", {
                required: "Please enter the date you started the institute."
            })})}
            <FormGroup errorMessage={errors?.instituteStartDate?.message} />

            {dateInput("Institute End Date:", {...register("instituteEndDate", {
                validate: value => {
                    if (value < instituteStartDate){
                        return "Institute End Date must be after the start date."
                    }
                }
            }
            )})}
            <FormGroup errorMessage={errors?.instituteEndDate?.message} />

            {inputChange("text", "Enter the city of the institute", {...register("instituteCity")})}
            <FormGroup errorMessage={errors?.instituteCity?.message}/>

            {inputChange("text", "Enter the country of the institute.", {...register("instituteCountry")})}

            <button>Add New Institute</button>
        </form>
    )
}