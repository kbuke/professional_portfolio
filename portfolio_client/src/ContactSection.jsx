import { useState } from "react"
import { useFetch } from "./useFetch"
import { AddSocials } from "./AddSocials"
import { AddEmail } from "./AddEmail"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faImdb, faGoodreads, faSpotify, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { DeleteSocials } from "./DeleteSocials"

export function ContactSection({
    // postInput
}){
    const [allSocials, setAllSocials] = useState([])
    const [socialAction, setSocialAction] = useState(null)
    const [sentEmail, setSentEmail] = useState(false)

    useFetch("/api/socials", setAllSocials)
    console.log(allSocials)


    return(
        <div
            className="all-socials-div"
        >
            <h1 
                className="section-heading"
            >
                CONTACT ME
            </h1>
            <div
                className="socials-grid"
            >
                <div id="social-media-section">
                    <h2>Social Media</h2>
                    <div className={allSocials.length > 0? "social-media-grid" : null}>
                        {allSocials.length > 0 ? 
                            allSocials.map((social, index) => {
                                return(
                                    <div
                                        className="social-media-container"
                                        key={index}
                                    >
                                        <a href={social.link} className="social-icon">
                                            <FontAwesomeIcon icon={
                                                social.name.toLowerCase() === "facebook"?
                                                    faFacebook
                                                :
                                                social.name.toLowerCase() === "instagram"?
                                                    faInstagram
                                                :
                                                social.name.toLowerCase() === "github"?
                                                    faGithub
                                                :
                                                social.name.toLowerCase() === "imdb"?
                                                    faImdb
                                                :
                                                social.name.toLowerCase() === "goodreads"?
                                                    faGoodreads 
                                                :
                                                social.name.toLowerCase() === "spotify" ?
                                                    faSpotify
                                                :
                                                social.name.toLowerCase() === "linkedin" ?
                                                    faLinkedin
                                                :
                                                    null
                                                }
                                                className="social-icon-img"
                                            />
                                        </a>
                                    </div>
                                )
                            })
                        :
                            <h2>
                                No Social Media to Display
                            </h2>
                        }
                    </div>
                </div>

                {sentEmail ?
                    <div>
                        <h1>Email Sent</h1>
                        <p>I'll get back to you asap, if you need to send another please refresh the page.</p>
                    </div>
                    :
                    <div
                        id="email-section"
                    >
                        <h2>Send Me an Email</h2>
                        <AddEmail 
                            // postInput={postInput}
                            sentEmail={sentEmail}
                            setSentEmail={setSentEmail}
                        />
                    </div>
                }
            </div>
        </div>
    )
}