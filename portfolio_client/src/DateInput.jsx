

export function DateInput({
    placeholder, register
}){
    return(
        <div>
            <label>{placeholder}</label>
            <input 
                type="date"
                {...register}
            />
        </div>
    )
}