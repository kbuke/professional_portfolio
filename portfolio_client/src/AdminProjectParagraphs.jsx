import { useState } from "react"
import { AdminDeleteParagraph } from "./AdminDeleteParagraph"
import { AdminEditParagraph } from "./AdminEditParagraph"

export function AdminProjectParagraphs({
    paragraph,
    paragraph_img_1,
    paragraph_img_2,
    id,
    project,
    allParagraphs,
    setAllParagraph
}){
    const [paragraphAction, setParagraphAction] = useState(null)

    return(
        paragraphAction === "edit" ?
            <AdminEditParagraph 
                paragraph={paragraph}
                paragraphImg1={paragraph_img_1}
                paragraphImg2={paragraph_img_2}
                paragraphId={id}
                setAllParagraph={setAllParagraph}
                setParagraphAction={setParagraphAction}
                projectId={project?.id}
            />
            :
            <div
                className="admin-paragraph-div"
            >
                <div
                    className="admin-paragraph-grid"
                >
                    <p
                        className="paragraph-text paragraph-project"
                    >
                        {project?.project_name} Paragraph
                    </p>

                    <p
                        className="paragraph-text"
                    >
                        {paragraph}
                    </p>

                    {paragraph_img_1 ?
                        <img 
                            className={`${project?.project_name} img1`}
                            src={paragraph_img_1}
                        />
                        :
                        null}

                    {paragraph_img_2?
                        <img 
                            className={`${project.project_name} img2`}
                            src={paragraph_img_2}
                        />
                        :
                        null}
                </div>

                <div
                    className="admin-paragraph-option-container"
                >
                    <button
                        className="admin-project-button edit-paragraph"
                        onClick={() => setParagraphAction("edit")}
                    >
                        Edit Paragraph
                    </button>

                    <button
                        className="admin-project-button delete-paragraph"
                        onClick={() => setParagraphAction("delete")}
                    >
                        Delete Paragraph
                    </button>
                </div>

                {paragraphAction === "delete"?
                    <AdminDeleteParagraph 
                        id={id}
                        setAllParagraph={setAllParagraph}
                        setParagraphAction={setParagraphAction}
                    />
                    :
                    null
                }
            </div>
    )
}