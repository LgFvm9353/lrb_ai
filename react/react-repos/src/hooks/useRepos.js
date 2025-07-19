import {
    useEffect,
    useContext
} from 'react'
import { GlobalContext } from '@/context/GlobalContext'
import { 
  getRepos,
  getRepoDetail
 } from '@/apis/repos'
// 将响应式业务逻辑抽离到hooks中 
export const useRepos = (id) =>{

   const {state,dispatch} = useContext(GlobalContext)
   useEffect(() => {
    dispatch({type:'FETCH_START'});
    (async()=>{
      try{
        const res = await getRepos(id)
        dispatch({type:'FETCH_SUCCESS',payload:res.data})
      }catch(error){
        dispatch({type:'FETCH_ERROR',payload:error.message})
      }
    })()
   },[])
   return state
}