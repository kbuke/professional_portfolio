export function useDelete(e, url, setState, instanceId){
    e.preventDefault()
    fetch(url, {
        method: "DELETE"
    })
        .then(r => {
            if(r.ok){
                setState(states => states.filter(state => state.id !== instanceId))
            }
        })
}