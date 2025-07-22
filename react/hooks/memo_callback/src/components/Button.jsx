import { memo } from "react"
import { useEffect } from "react"
const Button =(props)=>{
    useEffect(()=>{
        console.log("Button useEffect")
    },[])
   console.log("Button render")
    return <button>click me</button>
}
// 高阶组件
export default memo(Button)