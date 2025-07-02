import React from 'react'
import { useState } from 'react'
import './style.css'
const PictureCard = () => {
    const [word,setWord] = useState("");
    const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png');
    const updateImageData = (e) => {
        // 可选链操作符 ?.  当左侧的操作数是null或undefined时，不会抛出错误，而是返回undefined。
        // 当左侧的操作数不是null或undefined时，才会继续执行右侧的操作数。
        const file = e.target.files?.[0]
        if(!file){
            return;
        }
  
        // 图片预览 I/O 操作 异步操作 
        return new Promise((resolve,reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                resolve(e.target.result)
                setImgPreview(e.target.result)
                // 下面这两个一样
                // console.log(e.target.result)
                // console.log(reader.result)
            }
            reader.onerror = (e) => {
                reject(e)
            }
            reader.readAsDataURL(file)
        })
    }
    return (
        <div className='card'>
           <input id='selectImage' type='file' 
           accept='.jpg,.jpeg,.png,.gif' 
           onChange={updateImageData}/>
           <br/>
           <label className="upload" htmlFor='selectImage'>
            <img src={imgPreview} alt='preview'/>
           </label>
           {/* template -> JSX -> {数据绑定} -> 响应式 -> 单词业务 */}
           <div className='word'>word</div>
        </div>
    )
}

export default PictureCard