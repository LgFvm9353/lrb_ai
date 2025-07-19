import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [todos,setTodos] = useState([
    {
        id:1,
        title:'吃饭',
    },
    {
        id:2,
        title:'睡觉',
    },
    {
        id:3,
        title:'打豆豆',
    }
  ])
  useEffect(()=>{
        setTimeout(()=>{
            setTodos([     
                {
                    id:4,
                    title:'吃饭1',
                },
                ...todos,
            ])
        },1000)
    },[])
  return (
    <>
      {
        todos.map((todo,index,todos)=>{
            return <li key={todo.id}>{todo.title}</li>
        })
      }
    </>
  )
}

export default App
