import { 
  useState,
  useEffect,
  lazy,
  Suspense
 } from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import './App.css'
import Loading from './components/Loading'
const RepoList = lazy(()=>import('./pages/RepoList'))
function App() {
  // useEffect(()=>{
  //     (async()=>{
  //         const repos = await getRepos('LgFvm9353')
  //         const repo = await getRepoDetail('LgFvm9353','uuid')
  //         console.log(repos,repo)   
  //     })()
  //    return ()=>{
  //      console.log("cleanup")
  //    }
  // },[])
  return (
    <>
    <Suspense fallback={<Loading />}>     
        <Routes>
            <Route path='/users/:id/repos' element={<RepoList />}/>
            <Route path='*' element={<Navigate to="/users/LgFvm9353/repos"/>} /> 
        </Routes>
    </Suspense>    
    </>
  )
}

export default App
