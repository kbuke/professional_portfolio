export function usePatch(
    // e, 
    body, url, instanceId, setEditInstance, setLoading, setEditState){
    // e.preventDefault()

    const editBody = body
    setLoading(true)

    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editBody)
    })
    .then(r => {
        if(r.ok){
            setLoading(false)
            return r.json()
        } else {
            setLoading(false)
            console.error("Failed to update info")
            return null
        }
    })
    .then(newInfo => {
        if (newInfo) {
            setEditInstance(prev => {
                if (Array.isArray(prev)) {
                    return prev.map(instance =>
                        instance.id === instanceId ? newInfo : instance
                    )
                }
                setEditState(null)
                return newInfo  // single object
            })
        setLoading(false)
    }
})

    .catch(err => console.error("Patch error:", err))
}