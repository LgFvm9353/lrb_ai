import { useState } from 'react'
import PictureCard from './components/PictureCard'
import './App.css'

function App() {
   

  return (
    // JSX react优势 方便写html模板
    <div className='container'>
      {/*  自定义组件 子组件
       组件 html,css,js
       图片上传功能
       模块化了，复用，页面由dom树 -》 组件树 */}
      <PictureCard />
    </div>
  )
}

export default App
