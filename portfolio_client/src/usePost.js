export function usePost(e, url, information, prevState, setState){
    console.log(prevState)
    e.preventDefault()
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
        })
}