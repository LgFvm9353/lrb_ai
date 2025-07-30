import styles from './toast.module.css'
import {
    useState,
    useEffect
} from 'react'
// ToastEvent 是mitt 的实例
import {toastEvents} from './ToastController'
const Toast = (props) => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({
        user: 0,
        bell: 0,
        mail: 0
    })
    useEffect(() => {
        // 订阅事件（订阅一个show事件，后面是事件的回调函数）
        // 订阅者show事件 订阅者
        toastEvents.on('show', (info) => {
            setData(info)
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 3000)
        })
        return () => {
            // 取消订阅
            toastEvents.off('show')
        }
    },[])
    // 等着通信的到来
    // 事件机制
    if(!visible) return null 
    return (
        <div className={styles.toastWrapper}>
           <div className={styles.toastItem}>👤 {data.user}</div>
           <div className={styles.toastItem}>🔔 {data.bell}</div>
           <div className={styles.toastItem}>✉ {data.mail}</div>
           <div className={styles.toastArrow}></div> 
        </div>
    )
}
export default Toast;