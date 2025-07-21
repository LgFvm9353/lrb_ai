import { useState,useEffect } from 'react'
import './App.css'
import { getTodos,getRepos } from '@/apis'

function App() {
  const [todos,setTodos] = useState([])
  const [repos,setRepos] = useState([])
  useEffect(()=>{
    const fetchData = async () => {
      const res = await getTodos();
      setTodos(res.data.data);
    }
    const fetchRepos = async () => {
      const res = await getRepos();
      setRepos(res.data.data);
    }
    fetchData()
    fetchRepos()
  },[])
  return (
    <>
     {/* {
       todos.map(item => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
          </div>
        )
       })
     } */}
     {
       repos.map(item => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        )
       })
     }
    </>
  )
}

export default App
