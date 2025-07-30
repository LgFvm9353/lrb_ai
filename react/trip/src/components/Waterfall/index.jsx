import styles from './waterfall.module.css';
import ImageCard from '@/components/ImageCard';
import {
    useEffect, 
    useRef
 } from 'react';
const Waterfall = (props) => {
  const {images,fetchImages,loading} = props;
  const loader = useRef(null);
  const columnRefs = [useRef(null), useRef(null)];

  // 计算列高度
  const getColumnHeights = () => {
    return columnRefs.map(ref => {
      return ref.current ? ref.current.offsetHeight : 0;
    });
  };

  // 分配图片到较短列
  const distributeImages = (imgs) => {
    const columnHeights = getColumnHeights();
    const columns = [[], []];
    
    imgs.forEach(img => {
      const shorterColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
      columns[shorterColumn].push(img);
      columnHeights[shorterColumn] += img.height || 300; // 默认高度
    });
    
    return columns;
  };

  const [leftColumn, rightColumn] = distributeImages(images);
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
    <div className={styles.wrapper}>
      <div className={styles.column} ref={columnRefs[0]}>
        {leftColumn.map(img => (
          <ImageCard key={img.id} {...img} />
        ))}
      </div>
      <div className={styles.column} ref={columnRefs[1]}>
        {rightColumn.map(img => (
          <ImageCard key={img.id} {...img} />
        ))}
      </div>
      <div ref={loader} />
    </div>
  );
}
export default Waterfall;