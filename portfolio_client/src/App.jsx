import { useFetch } from './customHooks/useFetch'
import { IntroSection } from './IntroSection'
import { TechnologySection } from './TechnologySection'
import { ProjectSection } from './ProjectSection'

function App() {
  return (
    <>
      <IntroSection />
      <TechnologySection />
      <ProjectSection />
    </>
  )
}

export default App
