pnpm uninstall react-dom

pnpm uninstall react

pnpm i react-dom@16

pnpm i react@16

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)