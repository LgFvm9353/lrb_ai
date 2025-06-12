import { useState,useRef } from 'react'
import './App.css'

function App() {
  // 配置
  const {VITE_TOKEN,VITE_APP_ID,VITE_CLUSTER_ID} = import.meta.env


  const [prompt,stPrompt]=useState('大家好，我是刘某人')
  // 状态 ready,waiting,done  界面由数据状态驱动
  const [state,setState]=useState('ready')
  // DOM 对象绑定 use 开头的都叫hooks 函数
  const audioRef=useRef(null)
 
  function createBlobURL(base64AudioData) {
    var byteArrays = []; 
    var byteCharacters = atob(base64AudioData); 
    for (var offset = 0; offset < byteCharacters.length; offset++) { 
      var byteArray = byteCharacters.charCodeAt(offset); 
      byteArrays.push(byteArray); 
    } 
    var blob = new Blob([new Uint8Array(byteArrays)], { type: 'audio/mp3' }); 
    return URL.createObjectURL(blob);
  }

  // 调用火山接口，返回语音
  const generateAudio = ()=>{
    const voiceName = "zh_male_sunwukong_mars_bigtts"; // 角色
    const endpoint = "/tts/api/v1/tts" // api 地址
      const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer;${VITE_TOKEN}`
      }
      // post请求体
      const payload = {
        app: {
          appid: VITE_APP_ID,
          token: VITE_TOKEN,
          cluster: VITE_CLUSTER_ID
        },
        user: {
          uid: 'bearbobo'
        },
        audio: {
          voice_type: voiceName,
          encoding: 'ogg_opus', // 编码
          compression_rate:1, // 压缩的比例
          rate: 24000,
          speed_ratio: 1.0,
          volume_ratio: 1.0,
          pitch_ratio: 1.0,
          emotion: 'happy' // 情绪
        },
        request: {
          reqid: Math.random().toString(36).substring(7),
          text: prompt,
          text_type: 'plain',
          operation: 'query', 
          silence_duration: '125', 
          with_frontend: '1', 
          frontend_type: 'unitTson', 
          pure_english_opt: '1',
        }
      }
      setState('loading')
      fetch(
        endpoint,
        {
          method: 'POST',
          headers: header,
          body: JSON.stringify(payload)
        }
      ).then(res => {
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
    })
    .then(data => {
      // 黑盒子 base64 字符串编码的格式表达图片，声音，视频
      // 编解码的问题
      const url = createBlobURL(data.data);
      audioRef.current.src = url;
      audioRef.current.play();
      setState('done')

    })
    .catch(error => {
        console.error('Error:', error)
    })
  }
  return (
    <div className='container'>
     <div>
      <label>Prompt</label>
      <button onClick={generateAudio}>Generate && Play</button>
      <textarea 
        className='input' 
        value={prompt} 
        onChange={(e)=>setPrompt(e.target.value)}
        />
     </div>
     <div className="out">
      <div>{status}</div>
      <audio ref={audioRef} controls/>
       
     </div>
    </div>
  )
}

export default App
