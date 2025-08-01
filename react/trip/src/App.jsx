import { 
  useState ,
  lazy,
  Suspense
} from 'react'
import './App.css'
import {Route,Routes,Navigate} from 'react-router-dom'
const Home=lazy(()=>import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Discount = lazy(() => import('@/pages/Discount'))
const Collection = lazy(() => import('@/pages/Collection'))
const Trip = lazy(() => import('@/pages/Trip'))
const Account = lazy(() => import('@/pages/Account'))
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'
import Loading from '@/components/Loading'
const Detail = lazy(() => import('@/pages/Detail'))
import Toast from '@/components/Toast'
const Coze = lazy(() => import('@/pages/Coze'))
function App() {

  return (
    <>
      <Suspense fallback={<Loading />}>
       {/* 一组一组路由，带有tabbar的Layout */}
       <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to='/home'/>}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/discount' element={<Discount/>}/>
          <Route path='/collection' element={<Collection />}/>
          <Route path='/trip' element={<Trip />}/>
          <Route path='/account' element={<Account />}/>
        </Route>
        <Route element={<BlankLayout />}>
          <Route path='/search' element={<Search/>}/>
          <Route path='/detail/:id' element={<Detail />}/>
          <Route path="/coze" element={<Coze />}/>
        </Route>
      </Routes>
      </Suspense>
      <Toast />
    </>
  );
}

export default App
