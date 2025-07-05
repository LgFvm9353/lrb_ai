import { useState } from 'react'
import './App.css'
import PictureCard from './components/PictureCard'
import { generateAudio } from './lib/audio'

function App() {
  // 上传图片
  const [word,setWord] = useState('请上传图片')
  // 例句
  const [sentence,setSentence] = useState('')
  // 声音
  const [audio,setAudio] = useState('')
  // 详情展开
  const [detailExpand,setDetailExpand] = useState(false)
  // 图片预览
  const [imgPreview,setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
  // 解释
  const [explanation,setExplanation] = useState([])
  // 问句？
  const [expReply,setExpReply] = useState([])

  const picPrompt = `
  分析图片的内容，找出最能描述图片的一个英文单词，尽量选择更简单的A1-A2的词汇。
  返回JSON数据:
  { 
    "image_description": "图片描述",
    "representative_word": "图片代表的英文单词",
    "example_sentence": "结合英文单词和图片描述，给出一个简单的例句",
    "explanation": "结合图片解释英文单词，段落以Look at...开头，将段落分句，每一句单独一行，解释到最后给一个日常生活有关的问句？",
    "explanation_reply": ["根据explanation给出的回复1","根据explanation给出的回复2"]
  }`
  // 上传图片
  const uploadImg = async (imageData) => {
     setImgPreview(imageData)
     const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
     const headers = { 
       'Content-Type': 'application/json', 
       Authorization: `Bearer ${import.meta.env.VITE_KIMI_API_KEY}` 
     };
    setWord('分析中...');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "model": "moonshot-v1-8k-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "image_url",
                "image_url": {
                  "url": imageData
                }
              },
                {
                  "type": "text",
                  "text": picPrompt
                }
            ]
          }
        ],
        stream: false,
      })
    })
    const data = await response.json();
    const replyData = JSON.parse(data.choices[0].message.content)
    console.log(replyData)
    setWord(replyData.representative_word)
    setSentence(replyData.example_sentence)
    setExplanation(replyData.explanation.split('\n'))
    setExpReply(replyData.explanation_reply)
    // url -> audio 一直都在
    // base64 -> atob -> unit8Array -> blob -> URL.createObjectURL -> 临时地址  只在当前页面有效  资源比较小
    const audioUrl = await generateAudio(replyData.example_sentence)
    console.log(audioUrl)
    setAudio(audioUrl)
  }
  return (
    <div className='container'>
      <PictureCard 
        word={word} 
        audio={audio}
        uploadImg={uploadImg}
      />
      <div className="output">
        <div>{sentence}</div>
        <div className="details">
          <button onClick={()=>setDetailExpand(!detailExpand)}>Talk about it</button>
          {
            detailExpand ? (
              <div className="expand">
                <img src={imgPreview} alt="preview" />  
                  {
                    explanation.map((item,index)=>{
                      <div key={index} className='explanation'>
                        {item}
                      </div>
                    })
                  }
                  {
                    expReply.map((item,index)=>{
                      <div key={index} className='explanation-reply'>
                        {item}
                      </div>
                    })
                  }
      
              </div>
            ) : (
              <div className="fold">
                
              </div>
            )
          }
        </div>
      </div>
       
    </div>
  )
}

export default App
