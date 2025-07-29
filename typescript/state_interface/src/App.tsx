import { useState } from 'react'
import './App.css'
import NameEditComponent from './components/NameEditComponent'
function App() {
  // ts 代码
  const [name,setName] = useState<string>('initialName')
  const setUsernameState = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target?.value)
  }
  
  return (
    <>
     <NameEditComponent userName={name} onChange={setUsernameState}></NameEditComponent>
    </>
  )
}

export default App
