import { PatchInput } from "./PatchInput";
import { useForm } from "react-hook-form";
import { DateInput } from "./DateInput";
import { useState } from "react";
import { usePatch } from "./usePatch";
import { FormGroup } from "./FormGroup";

export function AdminPatchInstitute({
    instituteName,
    instituteImg,
    instituteCity,
    instituteCountry,
    instituteIntro,
    instituteStartDate,
    instituteEndDate,
    id,
    setAllInstitutes,
    allInstitutes,
    setInstituteAction,
    setSelectedInstitute
}){
    const {
        register,
        handleSubmit, 
        formState: {errors},
    } = useForm()

    const [ongoingInstitute, setOngoingInstitute] = useState(instituteEndDate ? false : true)
    const [loading, setLoading] = useState(false)

    const onPatchInstitute = (formData) => {
        const updatedData = {
            institute_name: formData.instituteName,
            institute_img: formData.instituteImg,
            institute_city: formData.instituteCity,
            institute_country: formData.instituteCountry,
            institute_intro: formData.instituteIntro,
            institute_start_date: formData.instituteStartDate,
            institute_end_date: ongoingInstitute ? null : formData.instituteEndDate,
        }

        usePatch(updatedData, `/api/institutes/${id}`, id, setAllInstitutes, setLoading, setInstituteAction)

        setSelectedInstitute(null)
    }

    return(
        <form
            onSubmit={handleSubmit(onPatchInstitute)}
            className="admin-instance-form"
        >
            <h1>Edit Institute</h1>
            
            <PatchInput 
                labelTitle={"Institute Name: "}
                inputType={"text"}
                placeholder={"Please enter institutes name"}
                defaultValue={instituteName}
                register={register("instituteName", {
                    required: "Please enter project name",
                    // validate: value => {
                    //     const exists = allInstitutes.some(
                    //         institute => institute?.institute_name?.toLowerCase() === value.toLowerCase()
                    //     )
                    //     return !exists || "Institute already regsitered on app"
                    // }
                })}
            />
            <FormGroup errorMessage={errors?.instituteName?.message}/>
            
            <PatchInput 
                labelTitle={"Institute Image: "}
                inputType={"text"}
                placeholder={"Enter institute image"}
                defaultValue={instituteImg}
                register={register("instituteImg")}
            />
            
            <PatchInput 
                labelTitle={"Institute City: "}
                inputType={"text"}
                placeholder={"Please enter institute city"}
                defaultValue={instituteCity}
                register={register("instituteCity")}
            />
            
            <PatchInput 
                labelTitle={"Institute Country: "}
                inputType={"text"}
                placeholder={"Please enter institute country"}
                defaultValue={instituteCountry}
                register={register("instituteCountry")}
            />
            
            <textarea 
                {...register("instituteIntro")}
                className="institute-intro-text"
                placeholder="Please enter institute intro"
                defaultValue={instituteIntro}
            />
            
            <div
                className="institute-dates-container"
            >
                <h3>Start Date</h3>
                <DateInput 
                    placeholder={null}
                    register={register("instituteStartDate")}
                    original={instituteStartDate}
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
                            original={instituteEndDate}
                        />}
                    </div>
                </div>
            </div>
            
            <div
                className="admin-post-button-container"
            >
                <button
                    type="submit"
                >
                    Submit
                </button>
            
                <button
                    onClick={() => {
                        setInstituteAction(null)
                        setSelectedInstitute(null)
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}