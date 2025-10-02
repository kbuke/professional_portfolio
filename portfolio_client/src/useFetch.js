import { useEffect, useReducer } from "react";

export function useFetch(url, setState){
    useEffect(() => {
        const controller = new AbortController()

        fetch(url, {signal: controller.signal})
        .then(r => {
            if(r.ok){
                console.log("hi")
                return r.json()
            }
            throw r
        })
        .then(instances => setState(instances))

        .catch(e => {
            if(e.name === "AbortError") return;
            console.error("Fetch error:", e);
        })
        return () => {
            controller.abort()
        }
    }, [url])
}

