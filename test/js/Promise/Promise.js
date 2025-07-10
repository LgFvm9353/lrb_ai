// Promise 如何实现链式调用
// Promise 本质是一个有限状态机，有三种状态
// 对于Promise 而言，状态的改变不可逆
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
    self.onFulfilled = null
    self.onRejected = null

    const resolve =(value) => {
        if(self.status !== PENDING) return 
        setTimeout(()=>{
            self.status = FULFILLED
            self.value = value
            self.onFulfilled(self.value)
        })
    }

    const reject = (error) => {
        if(self.status !== PENDING) return
        setTimeout(()=>{
            self.reject = REJECTED
            self.error = error
            self.onRejected(self.error)
        })
    }

    executor(resolve,reject)
}

MyPromise.prototype.then = function(onFulfilled,onRejected)
{
    if(this.status === PENDING)
    {
        this.onFulfilled = onFulfilled
        this.onRejected = onRejected
    }else if(this.status === FULFILLED)
    {
        onFulfilled(this.value)
    }
    else onRejected(this.error)

    return this
}

import fs from 'fs'
let promise1 = new MyPromise((resolve, reject) => {
    fs.readFile('./001.txt', (err, data) => {
      if(!err){
        resolve(data);
      }else {
        reject(err);
      }
    })
  });
  
  let x1 = promise1.then(data => {
    console.log("第一次展示", data.toString());    
  });
  
  let x2 = promise1.then(data => {
    console.log("第二次展示", data.toString());    
  });
  
  let x3 = promise1.then(data => {
    console.log("第三次展示", data.toString());    
  });
  