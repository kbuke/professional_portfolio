import { useState } from "react";
import { useFetch } from "./useFetch";
import { AddInstitute } from "./AddInstitute";
import { DeleteInstitute } from "./DeleteInstitute";

export function InstituteSection({
    dateInput, 
    inputChange
}){
    const [allInstitutes, setAllInstitutes] = useState([])
    const [deleteInstitute, setDeleteInstitute] = useState(null)

    useFetch("/api/institutes", setAllInstitutes)

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
    const renderInstitutes = allInstitutes.map((institute, index) => {
        return(
            <div key={index}>
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

                    <button
                        onClick={() => setDeleteInstitute(institute.id)}
                    >
                        Delete Institute?
                    </button>

                    {deleteInstitute ?
                        <DeleteInstitute 
                            instituteId = {deleteInstitute}
                            setAllInstitutes={setAllInstitutes}
                            setDeleteInstitute={setDeleteInstitute}
                        />
                        :
                        null
                    }
                </div>
            </div>
        )
    })

    return(
        <div>
            <h1>Institutes</h1>
            {renderInstitutes}
            <AddInstitute 
                allInstitutes={allInstitutes}
                setAllInstitutes={setAllInstitutes}
                inputChange={inputChange}
                dateInput={dateInput}
            />
        </div>
    )
}