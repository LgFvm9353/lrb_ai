import { resolver } from "stylus";

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function MyPromise(executor) {
    let self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];
    
    const resolve = (value)=>{
        if(self.status!== PENDING) return;
        setTimeout(()=>{
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilledCallbacks.forEach(callback=>callback(self.value))
        })
    }
    const reject = (error)=>{
        if(self.status!== PENDING) return;
        setTimeout(()=>{
            self.status = REJECTED;
            self.error = error;
            self.onRejectedCallbacks.forEach(callback=>callback(self.error))
        })
    }
    executor(resolve,reject)
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const self = this;
    // 值穿透处理
    // 如果不是函数，就创建一个默认函数将值直接传递
    onFulfilled = typeof onFulfilled === 'function'? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function'? onRejected : error => { throw error };
    // 每次调用都返回新Promise，这是链式调用的关键
    return new MyPromise((resolver,reject)=>{
        const handleFulfilled = value =>{
            try{
                const result = onFulfilled(value);
                if(result instanceof MyPromise){
                    result.then(resolver,reject)
                }else 
                resolver(result)
            }catch(err){
                reject(err)
            }
        }
        const handleRejected = error =>{
            try{
                const result = onRejected(error)
                if(result instanceof MyPromise){
                    result.then(resolver,reject)
                }else
                resolver(result)
            }catch(err){
                reject(err)
            }
        }
        if(self.status === FULFILLED){
            handleFulfilled(self.value)
        }else if(self.status === REJECTED){
            handleRejected(self.error)
        }else{
            self.onFulfilledCallbacks.push(handleFulfilled)
            self.onRejectedCallbacks.push(handleRejected)
        }
    })
}
// 添加catch方法，用于捕获错误
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