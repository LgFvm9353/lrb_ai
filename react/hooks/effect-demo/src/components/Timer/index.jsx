import { useState,useEffect } from "react"
const Timer = () =>{

    const [time,setTime] = useState(0)
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(previewTime => previewTime+1)
        },1000)
        return () =>{
            console.log('组件卸载了')
             clearInterval(timer)
        }
    },[])
    return(
        <div>
            已经运行{time}秒
        </div>
    )
}

export default Timer