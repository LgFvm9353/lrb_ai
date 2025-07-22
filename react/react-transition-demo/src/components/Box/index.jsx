import styles from './box.module.css'
import { useState } from'react'
const Box  = ()=>{
   const [open,setOpen] = useState(false)
   return (
    <div>
      <button onClick={()=>setOpen(!open)}>
        {open ? "close" : "open"}
      </button>
      <div className={`${styles.box} ${open ? styles['box-open']:''}`}></div>
    </div>
   )
}
export default Box