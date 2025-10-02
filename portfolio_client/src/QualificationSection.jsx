import { useFetch } from "./useFetch";

export function QualificationSection(){
    const fetchData = useFetch("/api/qualifications")
    console.log(fetchData)
}