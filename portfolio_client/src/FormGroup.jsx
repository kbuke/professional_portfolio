export function FormGroup({
    errorMessage = "",
    children
}){
    return(
        <div>
            {children}
            {errorMessage.length > 0 && <div>{errorMessage}</div>}
        </div>
    )
}