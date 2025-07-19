import { useState,createElement } from 'react'
import './App.css'

function App() {
  const [todos,setTodos] = useState([
    {
      id:1,
      title:'学习React',
    },
    {
      id:2,
      title:'学习Vue',
    }
  ])

  const element = <h1 className='title'>Hello,World</h1>
  const element2 = createElement('h1',{id:'title'},'Hello,World')
  return (
    <>
      {element}
      {element2}
    </>
  )
}

export default App
