import { useState } from 'react'
import PictureCard from './components/PictureCard'
import './App.css'
// 引入生成音频的函数
import {generateAudio} from './lib/audio.js'


function App() {
  const picPrompt = `
   分析图片的内容，找出最能描述图片的一个英文单词，尽量选择更简单的A1-A2的词汇。
   返回JSON数据:
   { 
     "image_description": "图片描述",
     "representative_word": "图片代表的英文单词",
     "example_sentence": "结合英文单词和图片描述，给出一个简单的例句",
     "explanation": "结合图片解释英文单词，段乱以Look at...开头，将段落分句，每一句单独一行，解释到最后给一个日常生活有关的问句？",
     “explanation_replace”: ["根据explanation给出的回复1"，"根据explanation给出的回复2"]
   }
   `
  // 持有数据状态
   const [sentence,setSentence]  = useState('')
   const [explanation,setExplanation] = useState([])
   const [audio,setAudio] = useState('')
   const [word,setWord] = useState('请上传图片')
   const uploadImage = async (imgData)=>{
     setWord('图片分析中...')
     const endPoint = "https://api.moonshot.cn/v1/chat/completions"
     const headers = {
        "Authorization": `Bearer ${import.meta.env.VITE_KIMI_API_KEY}`,
        "Content-Type": "application/json",
     }
     const body = {
        "model": "moonshot-v1-8k-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "image_url",
                "image_url": {
                  "url": imgData
                }
              },
                {
                  "type": "text",
                  "text": picPrompt
                }
            ]
          }
        ],
        "max_tokens": 1024,
        "temperature": 0.5,
     }
     const response = await fetch(endPoint,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    const data = await response.json();
    console.log(data)
    const replyData = JSON.parse(data.choices[0].message.content)
    setWord(replyData.representative_word)
    setSentence(replyData.example_sentence)
    // setExplanation(replyData.explanation)

    const audioUrl = await generateAudio(replyData.example_sentence);
   }
  

  return (
    // JSX react优势 方便写html模板
    <div className='container'>
      {/*  自定义组件 子组件
       组件 html,css,js
       图片上传功能
       模块化了，复用，页面由dom树 -》 组件树 */}
       {/* props  */}
      <PictureCard 
      uploadImage={uploadImage}
      word={word}
      audio={audio}
      />

      <div className="output">
          <div>{sentence}</div>
      </div>
    </div>
  )
}

export default App
