const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

function MyPromise(executor)
{
    // 缓存当前Promise实例
    let self = this 
    self.value = null
    self.error = null
    self.status = PENDING
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    const resolve = (value) => {
        if(self.status !== PENDING) return;
        
        // 处理thenable对象
        if (value && typeof value.then === 'function') {
            value.then(resolve, reject);
            return;
        }
        
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilledCallbacks.forEach(callback => callback(self.value));
        });
    };

    const reject = (error) => {
        if(self.status !== PENDING) return;
        setTimeout(() => {
            self.status = REJECTED;  
            self.error = error;
            self.onRejectedCallbacks.forEach(callback => callback(self.error));
        });
    };

    executor(resolve,reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const self = this;
    
    // 值穿透处理
    // 如果不是函数，就创建一个默认函数将值直接传递
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };
    
    // 每次调用都返回新Promise，这是链式调用的关键
    return new MyPromise((resolve, reject) => {
        const handleFulfilled = value => {
            try {
                const result = onFulfilled(value);
                // 处理返回Promise的情况
                if (result instanceof MyPromise) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (err) {
                reject(err);
            }
        };
        
        const handleRejected = error => {
            try {
                const result = onRejected(error);
                // 处理返回Promise的情况
                if (result instanceof MyPromise) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (err) {
                reject(err);
            }
        };
        
        if (self.status === FULFILLED) {
            setTimeout(() => handleFulfilled(self.value));
        } else if (self.status === REJECTED) {
            setTimeout(() => handleRejected(self.error));
        } else {
            // 状态为 pending  将回调存入队列，等待状态改变后执行
            self.onFulfilledCallbacks.push(handleFulfilled);
            self.onRejectedCallbacks.push(handleRejected);
        }
    });
};

// 添加catch方法
MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};


import { readFile } from 'fs'
let readFilePromise = (filename) => {
  return new MyPromise((resolve, reject) => {
    readFile(filename, (err, data) => {
      if(!err){
        resolve(data.toString()); // 将Buffer转为字符串
      }else {
        reject(err);
      }
    })
  })
}
readFilePromise('./001.txt')
  .then(data => {
    console.log(data); // 移除toString()
    return readFilePromise('./002.txt');
  })
  .then(data => {
    console.log(data); // 移除toString()
    return 'done';
  })
  .then(console.log);
// 001.txt的内容
// 001.txt的内容
