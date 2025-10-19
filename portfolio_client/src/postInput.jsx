
export function PostInput({
    labelTitle, inputType, placeholder, additionalClassName, register
}){
    return(
        <div id = "post-input-div">
            <label className="post-label" style={{fontWeight: "bold"}}>
                {labelTitle} 
            </label>

            <input 
                type={inputType}
                placeholder={placeholder}
                {...register}
                className={`post-input ${additionalClassName}`}
            />
      </div>
    )
}