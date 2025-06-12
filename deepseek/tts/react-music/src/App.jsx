import { useState ,useRef} from 'react'  
import './App.css'

function App() {
  // 火山引擎tts 配置文件
  // const TOKEN = '';
  // const APP_ID = '';
  // const CLUSTER_IC = '';

  // 代码的可读性高于一切
  const [prompt,setPrompt] = useState('大家好')
  // react use开头 ref hook 可以获取DOM元素
  const audioPlayer = useRef(null);
  const playMusic = () => {
    // const audio = document.querySelector('audio')
    // audio.play()
    audioPlayer.current.play();
  }
  
  const generateAudio = () => {
     // 女性 
    // const voiceName = "zh_female_shuangkuaisisi_moon_bigtts";
    const voiceName = "zh_male_sunwukong_mars_bigtts";
    const endpoint = "/tts/api/v1/tts" // tts api llm 服务接口地址
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer;${TOKEN}`,
      'X-Token': TOKEN,
      'X-Appid': APP_ID,
      'X-Cluster-IC': CLUSTER_IC, 
    }
  }
  return (
    <div className="container">
      <div>
        <label>Prompt</label>
        <button onClick={generateAudio}>生成语音并播放</button>
        <textarea 
          className='input'
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}>

          </textarea>
      </div>
      <audio ref={audioPlayer} src="/sounds/snare.wav"></audio>
      <button onClick={playMusic}>播放</button>
      {/* <button onClick="alert('你还好吗？')">更原始的事件，如初恋般</button> */}
    </div>
  )
}

export default App
