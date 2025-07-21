// 工程化
import styles from './button.module.css'
const Button =()=>{
    console.log(styles)
    return (
        <>
        <button className={styles.button}>Button</button>
        </>
       )
}
export default Button