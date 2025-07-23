import { 
  useState,
  useEffect ,
  lazy,
  Suspense
} from 'react'
import './App.css'

import { Routes ,Route} from 'react-router-dom'
const Home = lazy(() => import('./views/Home'))
const Login = lazy(() => import('./views/Login'))
const Pay = lazy(() => import('./views/Pay'))
const RequireAuth = lazy(() => import('./components/RequireAuth'))
const NotFound = lazy(() => import('./views/NotFound'))
import NavBar from './components/NavBar'
function App() {
  
  return (
    <>
      <NavBar>

      </NavBar>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pay' element={
            <RequireAuth> 
            <Pay />
           </RequireAuth>
            } />
          <Route path='*' element={<NotFound /> } />
        </Routes>     
      </Suspense>
    </>
  )
}

export default App
