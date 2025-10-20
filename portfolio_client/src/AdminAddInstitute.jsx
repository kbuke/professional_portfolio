import { useForm } from "react-hook-form";
import { PostInput } from "./PostInput";
import { DateInput } from "./DateInput";
import { useState } from "react";
import { usePost } from "./usePost";

export function AdminAddInstitute({
    allInstitutes, setAllInstitutes, setInstituteAction
}){
    const [ongoingInstitute, setOngoingInstitute] = useState(false)

    const {
        register,
        handleSubmit, 
        formState: {errors},
    } = useForm()

    const onSubmit = (formData) => {
        if(ongoingInstitute){
            formData.instituteEndDate = null
        }

        usePost("/api/institutes", formData, allInstitutes, setAllInstitutes)
        setInstituteAction(null)
    }

    return(
        <form
            className="add-new-institute-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Add Institute</h1>

            <PostInput 
                labelTitle={"Institute Name: "}
                inputType={"text"}
                placeholder={"Please enter institutes name"}
                additionalClassName={"new-institute-name"}
                register={register("instituteName", {
                    required: "Please enter project name",
                    validate: value => {
                        const exists = allInstitutes.some(
                            institute => institute?.institute_name?.toLowerCase() === value.toLowerCase()
                        )
                        return !exists || "Institute already regsitered on app"
                    }
                })}
            />

            <PostInput 
                labelTitle={"Institute Image: "}
                inputType={"text"}
                placeholder={"Enter institute image"}
                additionalClassName={"new-institute-img"}
                register={register("instituteImg")}
            />

            <PostInput 
                labelTitle={"Institute City: "}
                inputType={"text"}
                placeholder={"Please enter institute city"}
                additionalClassName={"new-institute-city"}
                register={register("instituteCity")}
            />

            <PostInput 
                labelTitle={"Institute Country: "}
                inputType={"text"}
                placeholder={"Please enter institute country"}
                additionalClassName={"new-institute-country"}
                register={register("instituteCountry")}
            />

            <textarea 
                {...register("instituteIntro")}
                className="institute-intro-text"
                placeholder="Please enter institute intro"
            />

            <div
                className="institute-dates-container"
            >
                <h3>Start Date</h3>
                <DateInput 
                    placeholder={null}
                    register={register("instituteStartDate")}
                />
            </div>

            <div
                className="institute-dates-container"
            >
                <div
                    className="institute-end-date-specific"
                >
                    <h3>End Date</h3>

                    <div
                        className="ongoing-institute-container"
                    >
                        <input 
                            type="checkbox"
                            className="ongoing-institute-checkbox"
                            checked={ongoingInstitute}
                            onChange={e => setOngoingInstitute.tagret.checked}
                        />
                        <p
                            className={!ongoingInstitute ? "completed-text" : null}
                        >
                            Institute On-going
                        </p>

                        {ongoingInstitute ? null : <DateInput 
                            placeholder={null}
                            register={register("instituteEndDate")}
                        />}
                    </div>
                </div>
            </div>

            <div
                className="admin-post-button-container"
            >
                <button>Submit</button>

                <button>
                    Cancel
                </button>
            </div>
        </form>
    )
}