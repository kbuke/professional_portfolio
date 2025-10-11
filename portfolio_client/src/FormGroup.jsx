export function FormGroup({
    errorMessage = "",
    children
}){
    return(
        <div className="div-input-error-message">
            {children}
            {errorMessage.length > 0 && <div>{errorMessage}</div>}
        </div>
    )
}