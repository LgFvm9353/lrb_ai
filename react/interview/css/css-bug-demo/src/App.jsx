import { useState } from 'react'
import './App.css'
import Button from './components/Button'
// import 导入顺序
import AnotherButton from './components/AnotherButton'
function App() {

  return (
    <>
     <Button />
     <AnotherButton />
    </>
  )
}

export default App
