import { AdminProjects } from "./AdminProjects"

export function AdminSection({
    allReviews,
    setAllReviews,

    allProjects,
    setAllProjects
}){
    return(
        <div>
            <h1
                className="section-heading"
            >
                Admin Section
            </h1>

            <div>
                <h2
                    className="project-heading"
                >
                    Projects
                </h2>

                {allProjects.map((projects, index) => (
                    <AdminProjects 
                        {...projects}
                        setAllProjects={setAllProjects}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}