import { useState } from "react";
import { useFetch } from "./useFetch";

export function InstituteSection(){
    const [allInstitutes, setAllInstitutes] = useState([])

    useFetch("/api/institutes", setAllInstitutes)
    console.log(allInstitutes)

    const renderDates = (dateTypeText, dateValue) => {
        return(
            <div>
                <label>{dateTypeText}</label>
                <p>
                    {dateValue ? dateValue : "In Progress"}
                </p>
            </div>
        )
    }

    // Render Institues
    const renderInstitutes = allInstitutes.map(institute => {
        return(
            <div>
                <img src={institute.institute_img}/>

                <div>
                    <h2>{institute.institute_name}</h2>

                    <div>
                        {renderDates("Start Date:", institute.institute_start_date)}
                        {renderDates("End Date:", institute.institute_end_date)}
                    </div>

                    <p>
                        {institute.institute_intro}
                    </p>

                    <p>{institute.institute_city}, {institute.institute_country}</p>
                </div>
            </div>
        )
    })

    return(
        <div>
            <h1>Institutes</h1>
            {renderInstitutes}
        </div>
    )
}