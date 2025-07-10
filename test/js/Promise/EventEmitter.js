// 简单模拟node回调机制 内部利用了发布订阅模式

function EventEmitter(){
    // 使用Map 存储事件类型与回调的映射
    this.events = new Map();
}
// 回调包装函数
const wrapCallback = (fn,once=false)=>({
    callback: fn,
    // 标记是否为一次性监听
    once,
})

EventEmitter.prototype.addListener = function(type,fn,once=false){
    let handler = this.events.get(type);
    if(!handler)
    {
        //为type绑定事件回调 （首次添加该类型监听）
        this.events.set(type,wrapCallback(fn,once))
    }else if(handler && typeof handler.callback === 'function'){
        //目前type事件只有一个回调 (已有单个监听，转为数组存储)
        this.events.set(type,[handler,wrapCallback(fn,once)])
    }
    else{
        // 目前type事件回调数 >= 2（已有多个监听，直接push）
        handler.push(wrapCallback(fn,once))
    }
    // console.log(this.events); // 可以看到events的结构，便于理解
    // console.log(this.events.get(type)); 
}
// 删除监听
EventEmitter.prototype.removeListener = function(type,listener){
    let handler = this.events.get(type);
    if(!handler) return ;
    if(!Array.isArray(handler))
    {
        if(handler.callback === listener.callback)
        {
            this.events.delete(type)
        }else return
    }

    for(let i=0;i<handler.length;i++){
        let item = handler[i]
        if(item.callback === listener.callback){
            //删除该回调，注意数组塌陷的问题，即后面的元素会往前挪一位，i要--
            handler.splice(i,1)
            i--
            if(handler.length === 1)
            {
                // 长度为1 就不用存数组了
                this.events.set(type,handler[0])
            }
        }
    }
}
// 添加一次性监听
EventEmitter.prototype.once = function(type,fn){
    this.addListener(type,fn,true)
}

// 触发事件
EventEmitter.prototype.emit = function(type,...args){
    let handler = this.events.get(type);
    if(!handler) return ;
    if(Array.isArray(handler)){
        // 遍历列表，执行回调
        handler.map(item=>{
            item.callback.call(this,...args)
            // 标记once:true的项 直接移除
            if(item.once) this.removeListener(type,item)
        })
    }else{
        // 只有一个回调则直接执行
        handler.callback.apply(this,args)
        if(handler.once) this.events.delete(type);
    }
    return true;
}

EventEmitter.prototype.removeAllListener = function(type)
{
    let handler = this.events.get(type);
    if(!handler) return ;
    this.events.delete(type)
}

let e = new EventEmitter();
e.addListener('type', () => {
  console.log("type事件触发！");
})
e.addListener('type', () => {
  console.log("WOW!type事件又触发了！");
})

function f() { 
  console.log("type事件我只触发一次"); 
}
e.once('type', f)
e.emit('type'); // 触发两个常规监听器和一次性监听器
e.emit('type'); // 只触发常规监听器
// e.removeListener('type', f); // 删除f函数的监听器
e.removeAllListener('type');
e.emit('type');
