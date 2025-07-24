import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 移动端适配
import 'lib-flexible'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
