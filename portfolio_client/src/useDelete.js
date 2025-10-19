export function useDelete(e, url, setState, instanceId, setDelete){
    e.preventDefault()
    fetch(url, {
        method: "DELETE"
    })
        .then(r => {
            if(r.ok){
                console.log(r)
                setState(states => states.filter(state => state.id !== instanceId))
            }
        })
        .then(setDelete(null))
}