import styles from './another-button.module.css'
const AnotherButton =()=>{
    console.log(styles)
    return (
     <>
     <button className={styles.button}>AnotherButton</button>
     </>
    )
 }
export default AnotherButton