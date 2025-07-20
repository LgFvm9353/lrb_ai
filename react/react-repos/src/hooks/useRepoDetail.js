import {
    useEffect,
    useContext
} from 'react'
import { GlobalContext } from '@/context/GlobalContext'
import {getRepoDetail} from '@/apis/repos'
export const useRepoDetail = (id,name) => {
    const {state,dispatch} = useContext(GlobalContext)
    useEffect(() => {
     dispatch({type:'FETCH_START'});
     (async()=>{
       try{
         const res = await getRepoDetail(id,name)
         dispatch({type:'FETCH_SUCCESS',payload:res.data})
       }catch(error){
         dispatch({type:'FETCH_ERROR',payload:error.message})
       }
     })()
    },[])
    return state
}