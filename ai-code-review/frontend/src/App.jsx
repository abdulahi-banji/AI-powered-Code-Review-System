import { useState } from 'react'
import Landing from './components/Landing'
import './App.css'

function App() {
  const [showLanding, setShowLanding] = useState(true)

  const handleNavigate = () => {
    setShowLanding(false)
    // Navigate to code review page
  }

  if (showLanding) {
    return <Landing onNavigate={handleNavigate} />
  }

  return (
    <div>
      <h1>Code Review App</h1>
      {/* Code review component will go here */}
    </div>
  )
}

export default App
