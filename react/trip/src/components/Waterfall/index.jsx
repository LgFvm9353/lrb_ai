import styles from './waterfall.module.css';
import ImageCard from '@/components/ImageCard';
import {
    useEffect, 
    useRef
 } from 'react';
const Waterfall = (props) => {
  const {images,fetchImages,loading} = props;
  const loader = useRef(null);
  useEffect(() => {
    // ref 出现在视窗了 intersectionObserver
    const observer = new IntersectionObserver(([entries])=>{
      // 当元素进入视窗
      console.log(entries.intersecting);
      if(entries.isIntersecting){
        fetchImages();
      }
    },{
      threshold:0.5,
    })
    observer.observe(loader.current);

  },[])
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.column}>
            {
                images.filter((_,i)=> i%2 !==0).map(img=>(
                   <ImageCard key={img.id} {...img}/>
                ))
            }
          
        </div>
        <div className={styles.column}>
         {
                images.filter((_,i)=> i%2 ===0).map(img=>(
                    <ImageCard key={img.id} {...img}/>
                ))
            }
        </div>
        <div ref={loader} ></div>
      </div>
    </>
  )
}
export default Waterfall;