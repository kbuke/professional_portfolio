export function usePost(url, information, prevState, setState, setEndActionState){
    console.log(information)
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
            {setEndActionState ?
                setEndActionState(null)
                :
                null
            }
        })
}