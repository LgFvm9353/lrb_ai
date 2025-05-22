Promise.resolve().then(() => {
    console.log('Promise微任务');  // 输出2
  });
  
  process.nextTick(() => {
    console.log('nextTick任务');  // 输出1（优先级更高）
  });


  // 在I/O操作回调中
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => { 
    console.log('setTimeout');  // timers阶段
  }, 0);
  
  setImmediate(() => { 
    console.log('setImmediate');  // check阶段
  });
});
// 输出顺序不确定，取决于事件循环当前阶段