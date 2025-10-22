import { useForm } from "react-hook-form"
import { usePost } from "./usePost"
import { PostInput } from "./PostInput"
import { FormGroup } from "./FormGroup"

export function AdminAddTech({
    allTech, setAllTech, setTechAction
}){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const submitTech = (formData) => {
        usePost("/api/technologies", formData, allTech, setAllTech)
        setTechAction(null)
    }

    //Both means both front and back end
    const allowedTypes = ["Frontend", "Backend", "Cloud", "API", "Both"]
    
    return(
        <form
            className="add-new-project-form"
            onSubmit={handleSubmit(submitTech)}
        >
            <h1>
                Add New Tech
            </h1>

            <PostInput 
                labelTitle={"Tech Name"}
                inputType={"text"}
                placeholder={"Please enter project name"}
                additionalClassName={"new-tech-name"}
                register={register("techName", {
                    required: "Please enter tech name."
                })}
            />
            <FormGroup errorMessage={errors?.techName?.message}/>

            <PostInput 
                labelTitle={"Tech Img:"}
                inputType={"text"}
                placeholder={"Please enter image for tech"}
                additionalClassName={"new-tech-img"}
                register={register("techImg", {
                    required: "Please enter tech image"
                })}
            />
            <FormGroup errorMessage={errors?.techImg?.message}/>

            <div
                className="tech-type-container"
            >
                <label
                    className="post-label"
                >
                    Tech-Type
                </label>
                <select
                    defaultValue=""
                    {...register("techType", {
                        required: "Please choose a value"
                    })}
                    className="tech-type-selector"
                >
                    <option
                        value=""
                        disabled
                    >
                        Select Tech Type
                    </option>

                    {allowedTypes.map((type, index) => {
                        return(
                            <option
                                key={index}
                                value={type}
                            >
                                {type}
                            </option>
                        )
                    })}
                </select>
                <FormGroup errorMessage={errors?.techType?.message}/>
            </div>

            <div
                className="admin-post-button-container"
            >
                <button>Submit</button>

                <button
                    onClick={() => setTechAction(null)}
                >Cancel</button>
            </div>
        </form>
    )
}