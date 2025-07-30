import styles from './card.module.css'
import {Image} from 'react-vant'
const ImageCard = (props) => {
    const {url,height} = props;
    return (
        <div style={{height}} className={styles.card}>
            <Image src={url} lazyload alt="" className={styles.img}/>
        </div>
    )
}
export default ImageCard;