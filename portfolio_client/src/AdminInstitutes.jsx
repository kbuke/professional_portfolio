import { useState } from "react"
import { AdminAddInstitute } from "./AdminAddInstitute"
import { AdminDeleteInstitute } from "./AdminDeleteInstitute"
import { AdminPatchInstitute } from "./AdminPatchInstitute"

export function AdminInstitutes({
   id, institute_city, institute_country, institute_end_date,
   institute_img, institute_intro, institute_name, institute_start_date,
   allInstitutes, setAllInstitutes, instituteAction, setInstituteAction
}){
    const [selectedInstitute, setSelectedInstitute] = useState(null)

    return(
        <>
            {instituteAction === "Add" ?
                <AdminAddInstitute 
                    allInstitutes={allInstitutes}
                    setAllInstitutes={setAllInstitutes}
                    setInstituteAction={setInstituteAction}
                />
                :
                null
            }
            <div
                className="institute-grid"
            >
                <p>
                    {institute_name}
                </p>

                <img 
                    className="admin-institute-img"
                    alt={`${institute_img}-pic`}
                    src={institute_img}
                />

                <p>
                    {institute_start_date} - {institute_end_date? institute_end_date : "Present"}
                </p>

                <p>
                    {institute_city}, {institute_country}
                </p>

                <div>
                    <button
                        className="admin-delete-institute-button"
                        onClick={() => {
                            setSelectedInstitute(id)
                            setInstituteAction("delete")
                        }}
                    >
                        Delete Institute
                    </button>

                    <button
                        className="admin-edit-institute-button"
                        onClick={() => {
                            setInstituteAction("edit")
                            setSelectedInstitute(id)
                        }}
                    >
                        Edit Institute
                    </button>
                </div>
            </div>

            {selectedInstitute === id && instituteAction === "delete"?
                <AdminDeleteInstitute 
                    institueName={institute_name}
                    id={id}
                    setAllInstitutes={setAllInstitutes}
                    setInstituteAction={setInstituteAction}
                    setSelectedInstitute={setSelectedInstitute}
                />
                :
                null
            }

            {selectedInstitute === id && instituteAction === "edit"?
                <AdminPatchInstitute 
                    instituteName={institute_name}
                    instituteImg = {institute_img}
                    instituteCity = {institute_city}
                    instituteCountry = {institute_country}
                    instituteIntro = {institute_intro}
                    instituteStartDate = {institute_start_date}
                    instituteEndDate = {institute_end_date}
                    id = {id}
                    setAllInstitutes = {setAllInstitutes}
                    allInstitutes = {allInstitutes}
                    setInstituteAction={setInstituteAction}
                    setSelectedInstitute={setSelectedInstitute}
                />
                :
                null
            }
        </>
    )
}