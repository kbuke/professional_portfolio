export function usePost(url, information, prevState, setState, dependancies=null){
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
        })
}