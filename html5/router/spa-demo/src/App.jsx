import './App.css'
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  BrowserRouter,
  Link  // SPA link代替 a
} from 'react-router-dom'

import About from './pages/About'
import Home from './pages/Home'
function App() {
  
  return (
    <>
   
     <BrowserRouter>
     <nav>
        <ul>
            <li><Link to="/">Page 1</Link></li>
            <li><Link to="/about">Page 2</Link></li>
        </ul>
    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
