import React, { useState } from 'react';

// 内联样式替代外部CSS文件
const styles = {
  waterfallDemo: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  problemDescription: {
    backgroundColor: '#fff4e6',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    borderLeft: '4px solid #ffa502'
  },
  waterfallContainer: {
    display: 'flex',
    gap: '20px'
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  waterfallItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  columnStats: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f1f2f6',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
};

const generateProblematicItems = () => {
  return [
    { id: 'tall-1', height: 300, content: '高项目 1', color: '#ff6b6b' },
    { id: 'short-1', height: 150, content: '矮项目 1', color: '#48dbfb' },
    { id: 'tall-2', height: 300, content: '高项目 2', color: '#ff6b6b' },
    { id: 'short-2', height: 150, content: '矮项目 2', color: '#48dbfb' },
    { id: 'tall-3', height: 300, content: '高项目 3', color: '#ff6b6b' },
    { id: 'short-3', height: 150, content: '矮项目 3', color: '#48dbfb' }
  ];
};

const ProblematicWaterfall = () => {
  const [items] = useState(generateProblematicItems);
  
  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 === 1);
  
  return (
    <div style={styles.waterfallDemo}>
      <h2>极端高度分布演示</h2>
      <div style={styles.problemDescription}>
        <p>▶ 左列: 3个300px高项目</p>
        <p>▶ 右列: 3个150px矮项目</p>
      </div>
      
      <div style={styles.waterfallContainer}>
        <div style={styles.column}>
          {leftColumn.map(item => (
            <div 
              key={item.id}
              style={{
                ...styles.waterfallItem,
                height: `${item.height}px`,
                backgroundColor: item.color
              }}
            >
              {item.content} ({item.height}px)
            </div>
          ))}
          <div style={styles.columnStats}>
            左列总高度: {leftColumn.reduce((sum, item) => sum + item.height, 0)}px
          </div>
        </div>
        
        <div style={styles.column}>
          {rightColumn.map(item => (
            <div
              key={item.id}
              style={{
                ...styles.waterfallItem,
                height: `${item.height}px`,
                backgroundColor: item.color
              }}
            >
              {item.content} ({item.height}px)
            </div>
          ))}
          <div style={styles.columnStats}>
            右列总高度: {rightColumn.reduce((sum, item) => sum + item.height, 0)}px
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblematicWaterfall;