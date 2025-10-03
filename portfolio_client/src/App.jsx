import { TechStack } from "./TechStack"
import { Projects } from "./Projects"
import { IntroSection } from "./IntroSection"
import { QualificationSection } from "./QualificationSection"
import { InstituteSection } from "./InstituteSection.jsx"


function App() {

  // Function for input types of text, password, email etc
  const inputChange = (inputType, placeholder, register) => {
    return(
      <input 
        type={inputType}
        placeholder={placeholder}
        // onChange={e => setState(e.target.value)}
        {...register}
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
      <IntroSection />

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
