import { useState } from 'react'
import Page from './components/Page'
import './App.css'
import { ThemeContext } from './ThemeContext'
function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')
  return (
    <>
    <ThemeContext.Provider value={theme}>
      <Page />
      <button onClick={()=>setTheme('dark')}>切换主题</button>
      
    </ThemeContext.Provider>
      
    </>
  )
}

export default App
