
// export function DateInput({ placeholder, register, original = null }) {
//   const formattedOriginal = original ? new Date(original).toISOString().slice(0, 10) : "";

//   return (
//     <div>
//       {placeholder && <label>{placeholder}</label>}
//       <input 
//         type="date"
//         {...register}
//         defaultValue={formattedOriginal}
//       />
//     </div>
//   )
// }

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