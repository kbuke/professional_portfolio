import { Projects } from "./Projects"
import { LandingPage } from "./LandingPage.jsx"
import { useEffect, useRef, useState } from "react"
import { useFetch } from "./useFetch.js"
import { ContactSection } from "./ContactSection.jsx"
import { NavBar } from "./NavBar.jsx"
import "./styles.css"
import { Reviews } from "./Reviews.jsx"
import { DetectSections } from "./DetectSections.js"


function App() {
  const [account, setAccount] = useState([])
  const [allReviews, setAllReviews] = useState([])
  const [activeSection, setActiveSection] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  useFetch("/api/session", setLoggedInUser)

  console.log(loggedInUser)

  useFetch("/api/reviews", setAllReviews)

  //Fetch all projects
  useFetch("/api/projects", setAllProjects)

  //Fetch user details
  useFetch("/api/users/1", setAccount)

  const landingRef = useRef(null)
  const projectRef = useRef(null)
  const reviewsRef = useRef(null)
  const contactRef = useRef(null)

  // SCROLL FUNCTION
  const scrollToSection = (section) => {
    switch(section){
      case "Projects":
        projectRef.current?.scrollIntoView({
          behavior: "smooth"
        })
        break 
      case "Referals":
        reviewsRef.current?.scrollIntoView({
          behavior: "smooth"
        })
        break
      case "Contact":
        contactRef.current?.scrollIntoView({
          behavior: "smooth"
        })
        break
      default:
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
    }
  }

  // DETECT WHEN SECTION IS IN VIEW
  useEffect(() => {
    const sections = [
      {name: null, ref: landingRef},
      {name: "Projects", ref: projectRef},
      {name: "Referals", ref: reviewsRef},
      {name: "Contact", ref: contactRef}
    ]

    const observer = new IntersectionObserver( 
      entries => {
        const visibleSection = entries.find(entry => entry.isIntersecting)
        if (visibleSection){
          const sectionName = sections.find(
            (s) => s.ref.current === visibleSection.target
          )?.name
          setActiveSection(sectionName)
        }
      },
      {threshold: 0.6}
    )

    sections.forEach(s => {
      if(s.ref.current) observer.observe(s.ref.current)
    })
    
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={landingRef}
      >
        <LandingPage 
          {...account}
        />
      </div>

      <NavBar 
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        setLoggedInUser={setLoggedInUser}
        loggedInUser={loggedInUser}
      />

      <div
        ref={projectRef}
      >
        <Projects 
          allProjects={allProjects}
        />
      </div>

      <div
        ref={reviewsRef}
      >
        <Reviews 
          allReviews={allReviews}
          setAllReviews={setAllReviews}
        />
      </div>

      <div
        ref={contactRef}
      >
        <ContactSection />
      </div>
    </>
  )
}

export default App
