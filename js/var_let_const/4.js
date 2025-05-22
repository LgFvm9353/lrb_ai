// 同步任务：构造函数调用
function Demo() {
    console.log('3. 构造函数内部执行');  
  }
  
  console.log('1. 同步任务开始');  
  
  // 异步宏任务：定时器
  setTimeout(() => {
    console.log('6. 定时器宏任务执行');  
    // 宏任务内部生成微任务
    Promise.resolve().then(() => {
      console.log('7. 定时器内的微任务');  
    });
  }, 0);
  
  // 微任务：Promise回调
  Promise.resolve().then(() => {
    console.log('5. 第一个Promise微任务'); 
    // 微任务内部注册宏任务
    setTimeout(() => {
      console.log('8. 微任务内的定时器宏任务'); 
    }, 0);
  });
  
  // 同步任务：构造函数调用
  console.log('2. 准备创建Demo实例');  
  const demo = new Demo();  
  
  console.log('4. 同步任务结束');