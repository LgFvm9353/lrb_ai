import React from 'react'


import './main.css'
import {
    createRoot
} from 'react-dom/client'

import Hello from './Hello.tsx'

createRoot(
    document.getElementById('app')
).render(
    <Hello />
)
