export function usePost(url, information, prevState, setState, setEndActionState, setId, setIsLoading, setSentEmail){
    console.log(information)
    setIsLoading(true)
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information)
    })
        .then(r => r.json())
        .then(newAddition => {
            setState([...prevState, newAddition])
            setIsLoading(false)
            setSentEmail(true)
            setEndActionState(null)
            {setId ? setId(null) : null}
        })
}