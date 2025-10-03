export function usePatch(e, body, url, instanceId, editInstance, setEditInstance, setAllState){
    e.preventDefault()

    const editBody = body

    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editBody)
    })
    .then(r => {
        if(r.ok){
            return r.json()
        } else {
            console.error("Failed to update info")
            return null
        }
    })
    .then(newInfo => {
        if(newInfo){
            setAllState(prev => prev.map(instance =>
                instance.id === instanceId ? newInfo : instance
            ))
            setEditInstance(false)
        }
    })
    .catch(err => console.error("Patch error:", err))
}