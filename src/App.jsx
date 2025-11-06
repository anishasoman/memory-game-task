import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MemoryGame from './MemoryGame'
import Landingpage from './pages/Landingpage'
function App() {


  return (
    <>
    
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/game" element={<MemoryGame />} />
      </Routes>
    
    </>
  )
}

export default App
