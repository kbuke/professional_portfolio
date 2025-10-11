import { TechStack } from "./TechStack"
import { Projects } from "./Projects"
import { IntroSection } from "./IntroSection"
import { QualificationSection } from "./QualificationSection"
import { InstituteSection } from "./InstituteSection.jsx"
import "./styles.css"
import { useFetchReducer } from "./useFetchReducer.js"
import { useState } from "react"


function App() {
  // const [allTech, dispatch] = useReducer(reducer, {isError: false, isLoading: true})
  var allTech = []
  const tech = useFetchReducer("/api/technologies", allTech)
  console.log(tech)

  allTech = tech?.data

  // const allTech = tech?.data

  const [isLoading, setIsLoading] = useState(false)

  // Function for input types of text, password, email etc
  const inputChange = (inputType, placeholder, register, defaultValue, additionalClassName) => {
    return(
      <input 
        type={inputType}
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue || ""}
        className={`input input-${additionalClassName}`}
      />
    )
  }

  // Function for input that are dates
  const dateInput = (placeholder, register) => {
    return(
      <div>
        <label>{placeholder}</label>
        <input 
          type="date"
          {...register}
      />
      </div>
    )
  }



  return (
    <>
      {allTech?.map(tech => <h1>{tech.tech_name}</h1>)}
      <IntroSection 
        inputChange={inputChange}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <TechStack 
        inputChange={inputChange}
      /> 

      <Projects 
        inputChange={inputChange}
        dateInput={dateInput}
      />

      <InstituteSection 
        dateInput={dateInput}
        inputChange={inputChange}
      />
    </>
  )
}

export default App
