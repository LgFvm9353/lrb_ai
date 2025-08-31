import {
    useRef,
    useState
} from 'react';

const VirtualList = ({
    data,
    height,
    itemHeight,
    renderItem,
    overscan
}) => {
    const containerRef = useRef(null);
    const totalHeight = data.length * itemHeight;
    
    const [offset, setOffset] = useState(0);
    
    const onScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setOffset(scrollTop);
      }
    }
    
    // 3. 缺少实际渲染内容的逻辑
    <div style={{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      transform:`translateY(${offset}px)`
    }}>
      {data.slice(
        Math.floor(offset/itemHeight),
        Math.floor(offset/itemHeight) + Math.ceil(height/itemHeight) + overscan
      ).map((item, index) => (
        <div key={item.id} style={{
          position: 'absolute',
          top: `${(Math.floor(offset/itemHeight) + index) * itemHeight}px`,
          width: '100%'
        }}>
          {renderItem(item, Math.floor(offset/itemHeight) + index)}
        </div>
      ))}
    </div>
    return (
        <div
            ref={containerRef}
            onScroll={onScroll}
            style={{
                height,
                overflowY: 'auto',
                position:'relative',
                // 性能优化点 新的图层
                willChange:'transform'
            }}
        >
            <div style={{height: totalHeight, position: 'relative'}}></div>
            <div style={{
                position:'absolute',
                top:0,
                left:0,
                right:0,
                transform:`translateY(${offset}px)`
            }}></div>
        </div>
    )
}

export default VirtualList;