
import { createRoot } from 'react-dom/client'
// 移动端适配
import 'lib-flexible'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
