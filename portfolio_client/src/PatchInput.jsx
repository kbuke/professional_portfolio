export function PatchInput({
    labelTitle, inputType, 
    placeholder, defaultValue, register
}){
    return(
        <div
            id="patch-input-div"
        >
            <label className="patch-label" style={{fontWeight: "bold"}}>
                {labelTitle}
            </label>

            <input 
                type={inputType}
                placeholder={placeholder}
                {...register}
                defaultValue={defaultValue}
                className="patch-input"
            />
        </div>
    )
}