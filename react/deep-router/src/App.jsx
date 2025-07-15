import { useState,lazy,Suspense } from 'react'
import './App.css'
// import Home from './pages/Home'
// import About from './pages/About'
// import ProtectRoute from './pages/ProtectRoute'
const ProtectRoute = lazy(()=> import('./pages/ProtectRoute'))
// 是一个函数，在路由导入的时候才执行，返回的是被lazy过后的组件
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Pay = lazy(() => import('./pages/Pay'))
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom'

import Navigation from './components/Navigation'

function App() {

  return (
    <>
     <Router>
      <Navigation />
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Suspense fallback={<div>加载中...</div>}><About /></Suspense>} />
      </Routes> */}

     <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* 鉴权 */}
          <Route path="/pay" element={
            <ProtectRoute >
              <Pay />
            </ProtectRoute>} />
          {/* 捕获未匹配的路由 */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
     </Router>
    </>
  )
}

export default App
