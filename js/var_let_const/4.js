console.log('同步任务执行'); 
// 定时器任务（异步注册回调）
setTimeout(() => {
    console.log('定时器回调执行');
  }, 0);
  
  // 网络请求（异步加载数据）
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log('数据加载完成'));