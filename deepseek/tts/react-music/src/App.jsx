import { useState ,useRef} from 'react'  
import './App.css'

function App() {
 
  // react use开头 ref hook 可以获取DOM元素
  const audioPlayer = useRef(null);
  console.log(audioPlayer);
  const playMusic = () => {
    // const audio = document.querySelector('audio')
    // audio.play()
    audioPlayer.current.play();
  }
  return (
    <>
      <audio ref={audioPlayer} src="/sounds/snare.wav"></audio>
      <button onClick={playMusic}>播放</button>
      {/* <button onClick="alert('你还好吗？')">更原始的事件，如初恋般</button> */}
    </>
  )
}

export default App
