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


MyPromise.resolve = function(value) {
    if(value instanceof MyPromise) {
        return value;
    }
    return new MyPromise((resolve,reject) => {
        if(value && value.then &&typeof value.then === 'function') {
            value.then(resolve,reject);
        }
        else resolve(value);
    });
};

MyPromise.reject = function(reason) {
    return new MyPromise((resolve,reject) => {
        reject(reason);
    });
};

MyPromise.finally = function(callback){
    return this.then(
        value => MyPromise.resolve(callback()).then(() => value),
        reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
}


MyPromise.all = function(promises) {
    return new MyPromise((resolve,reject) => {
        let results = [];
        let index = 0;
        let len = promises.length;
       if(len === 0) {
        resolve(results);
        return;
       }
       for(let i=0;i<len;i++)
       {
        MyPromise.resolve(promises[i]).then(
            value => {
                results[i] = value;
                index++;
                if(index === len) {
                    resolve(results);
                }
            },
            reason => {
                reject(reason);
            }
        )
       }
    })
}
MyPromise.race = function(promises) {
    return new MyPromise((resolve, reject) => {
        let len = promises.length;
        if(len === 0) {
            return;
        }
        for(let i=0;i<len;i++) {
            MyPromise.resolve(promises[i]).then(
                value => {
                    resolve(value);
                },
                reason => {
                    reject(reason);
                }
            )
        }
    })
}
MyPromise.allSettled = function(promises) {
    return new MyPromise(resolve => {
      let results = [];
      let completed = 0;
      const checkComplete = () => {
        if (completed === promises.length) resolve(results);
      };
  
      promises.forEach((promise, i) => {
        MyPromise.resolve(promise).then(
          value => {
            results[i] = { status: 'fulfilled', value };
            completed++;
            checkComplete();
          },
          reason => {
            results[i] = { status: 'rejected', reason };
            completed++;
            checkComplete();
          }
        );
      });
    });
  };

// 基本功能测试
const p1 = new MyPromise((resolve) => {
    setTimeout(() => resolve('成功'), 1000);
  });
  
  p1.then(res => {
    console.log(res); // 1秒后输出"成功"
    return '链式调用';
  }).then(res => {
    console.log(res); // 输出"链式调用"
    throw new Error('测试错误');
  }).catch(err => {
    console.error(err.message); // 输出"测试错误"
  });
  
  // all方法测试
  MyPromise.all([
    MyPromise.resolve(1),
    new MyPromise(resolve => setTimeout(() => resolve(2), 1000)),
    3 // 非Promise值
  ]).then(console.log); // 约1秒后输出[1, 2, 3]
  
  // race方法测试
  MyPromise.race([
    new MyPromise(resolve => setTimeout(() => resolve('慢速'), 1500)),
    new MyPromise(resolve => setTimeout(() => resolve('快速'), 500))
  ]).then(console.log); // 0.5秒后输出"快速"