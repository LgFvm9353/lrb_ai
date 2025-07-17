import { useState } from 'react'
import './App.css'
import {
    HashRouter,
    BrowserRouter,
    Routes,
    Route,
    Link,
}from'react-router-dom'
import { lazy } from 'react'
const Home = lazy(()=>import('./pages/Home'))
const About = lazy(()=>import('./pages/About'))
function App() {

  return (
    <>
    <BrowserRouter>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
     </nav>
     <main>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
     </main>
    </BrowserRouter>
    
    </>
  )
}

export default App
