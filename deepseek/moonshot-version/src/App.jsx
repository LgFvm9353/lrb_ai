import { useState } from 'react'
import './App.css'

function App() {
  // react 内置的hook（钩子） 函数 快速地解决一些问题
  // useState 用来创建一个状态 响应式的数据状态
  // useRef 用来创建一个引用  DOM对象的绑定
  // useEffect 用来创建一个副作用
  const [content,setContent] = useState('')
  const [imgBase64Data,setImgBase64Data] = useState('')
  const [isValid,setIsValid] = useState(false)
  const updateBase64Data = (e) => {
    // 拿到图片 e html5 js 和操作系统本地文件交互
    const file = e.target.files[0]
    if(!file) {
      return
    }
    // 把图片转成base64
    const reader = new FileReader()
    reader.readAsDataURL(file)
    // 异步操作
    reader.onload = () => {
      // 拿到base64
     setImgBase64Data(reader.result)
     setIsValid(true)
    }
  }
  const update = async () => {
     if(!imgBase64Data) {
      return
     }
     // 调用接口
     const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
     const headers = {
      'Content-Type': 'application/json',
      // 授权码 Bearer 一般都会带  
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
     }
     // 实时反馈给用户
     setContent('正在生成中...')
     const response = await fetch(endpoint,{
      method: 'POST',
      headers,  //es6 JSON key value 一样可以省略
      body: JSON.stringify({
        model: 'moonshot-v1-8k-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  "url": imgBase64Data
                }
              },
              {
                type: 'text',
                text: '请描述图片的内容'
              }
            ]
          }
        ]
      })
     })
     // 二进制字节流 json 也是异步的
     const data = await response.json()
     setContent(data.choices[0].message.content)
  }
  return (
    <div className='container'>
     <div>
      {/* 无障碍访问 */}
      <label htmlFor="fileInput">文件</label>
      <input type="file" 
        id='fileInput' 
        className='input'
        accept='.jpeg,.jpg,.png,.gif'
        onChange={updateBase64Data}/>
     </div>
     <button onClick={update} disabled={!isValid}>提交</button>
     <div className="output">
        <div className="preview">
          {
            imgBase64Data && <img src={imgBase64Data} alt=''></img>
          }
        </div>
     </div>
     <div>
      {content}
     </div>
    </div>
  )
}

export default App
