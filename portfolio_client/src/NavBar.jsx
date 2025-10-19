import { useEffect, useState } from "react"

export function NavBar({
    scrollToSection,
    activeSection,
    setLoggedInUser,
    loggedInUser
    }){
        const sections = ["Projects", "Referals", "Contact", "CV", loggedInUser ? "Logout" : null]
        const [selectedHeader, setSelectedHeader] = useState()
        const [logOut, setLogOut] = useState(false)

        useEffect(() => {
            setSelectedHeader(activeSection)
        }, [activeSection])

        const completeLogOut = () => {
            fetch("api/logout", {
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    setLoggedInUser(false)
                }
            })
        }

        return(
            <div
                className="nav-bar-div"
            >
                {sections.map((section, index) => {
                    if (!section) return null
                    return(
                        <div
                            key={index}
                            className={`option-div ${selectedHeader === section ? "selected-header" : null}`}
                            onClick={(e) => {
                                scrollToSection(section)
                                setSelectedHeader(section)
                                section === "Logout" ? completeLogOut() : null
                            }}
                        >
                            {section}
                        </div>
                    )
                })}
            </div>
        )
}