

export function DateInput({
    placeholder, register, original=null
}){
    return(
        <div>
            <label>{placeholder}</label>
            <input 
                type="date"
                {...register}
                defaultValue={original? original : ""}
            />
        </div>
    )
}