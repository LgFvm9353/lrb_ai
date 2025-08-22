import {aMessage} from './a.js'
import Hello from './Hello.jsx' // main.js webpack.config.js等都需要修改

// 引入css 文件
import './main.css'
document.getElementById('app').innerHTML=`
   <h1>Webpack 打包</h1>
   <p>${aMessage()}</p>
`
