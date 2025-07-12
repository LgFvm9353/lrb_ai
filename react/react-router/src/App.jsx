import { useState } from 'react'
import {
  BrowserRouter as Router,  //前端路由
  Routes, // 路由设置容器
  Route   // 单条路由
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* 前端路由接管一切，配置 */}
     <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
