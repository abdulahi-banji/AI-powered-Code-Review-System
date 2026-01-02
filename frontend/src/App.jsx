import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import CodeReview from './components/CodeReview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/review" element={<CodeReview />} />
      </Routes>
    </Router>
  )
}

export default App

