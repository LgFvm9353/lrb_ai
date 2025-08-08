import styles from './new.module.css'
import {
    useState,
    useRef 
} from 'react'

const ArticleNew = ()=>{
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  // 这里useRef用于保存mediaRecordRef对象
  const mediaRecordRef = useRef(null)
  // 存储一些数据
  const chunksRef = useRef([])

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // 只取 base64 数据部分
      reader.readAsDataURL(blob);
    });
  };

  const handleStartRecording = async ()=>{
     try{
       const stream = await window.navigator.mediaDevices.getUserMedia({
          audio:true
       })
       mediaRecordRef.current = new MediaRecorder(stream)
       
       mediaRecordRef.current.ondataavailable = (e)=>{
        if(e.data.size>0){
             console.log(e.data)
            chunksRef.current.push(e.data)
        }
       }
       mediaRecordRef.current.onstop = async()=>{
        // 二进制blob数组传递给大模型
        const blob = new Blob(chunksRef.current,{
            type:'audio/webm'
        })
        const base64Audio = await blobToBase64(blob)
        const transcript = await transcribeAudio(
            base64Audio
        )
        console.log(transcript)

       }
       mediaRecordRef.current.start()
     }
     catch(err){
        console.log(err)
     }
  }
  const handleRecording = ()=>{
     mediaRecordRef.current?.stop()

  }
  const handlePublish = ()=>{

  }

  return (
    <div className={styles.container}>
        <h2>发布文章</h2>
      <input
          type="text"
          placeholder='请输入标题'
          value={title}
          onChange={(e)=>setTitle(e.target.value)} 
          className={styles.input}

      />
      <div className={styles.textareaWrapper}>
         <textarea
            className={`${styles.input} ${styles.textarea}`}
            placeholder='请输入内容'
            value={content} 
            onChange={(e)=>setContent(e.target.value)}
         />
         <button 
            className={styles.micButton}
            onMouseDown={handleStartRecording}
            onMouseUp={handleRecording}
            title="按住语音"
            >🎤</button>
      </div>
      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.save}`}>保存草稿</button>
        <button 
           className={`${styles.button} ${styles.public}`}
           onClick={handlePublish}
           >发布</button>
      </div>
    </div>
  )
}

export default ArticleNew