function EventEmitter(){
    // 使用Map 存储事件类型与回调的映射
    this.events = new Map();
}

const wrapCallback = (fn,once)=>({
    callback: fn,
    once,
})
EventEmitter.prototype.addListener = function (type, fn,once=false) {
    let handler = this.events.get(type);
    if(!handler) this.events.set(type,wrapCallback(fn,once))
    else if(! Array.isArray(handler))
    {
        this.events.set(type,[handler,wrapCallback(fn,once)])
    }else {
        handler.push(wrapCallback(fn,once))
    }
}
// 删除监听
EventEmitter.prototype.removeListener = function(type,listener){
    let handler = this.events.get(type);
    if(!handler) return 
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
            handler.splice(i,1)
            i--
            if(handler.length === 1)
            {
                this.events.set(type,handler[0])
            }
        }
    }
}
EventEmitter.prototype.removeAllListener = function(type)
{
    let handler = this.events.get(type);
    if(!handler) return ;
    this.events.delete(type)
}
EventEmitter.prototype.once = function(type,fn){
    this.addListener(type,fn,true)
}


// 触发事件
EventEmitter.prototype.emit = function(type,...args){
    let handler = this.events.get(type);
    if(!handler) return ;
    if(Array.isArray(handler)){
        // 遍历列表，执行回调
        handler.map(item => {
            item.callback.call(this,args)
            if(item.once) this.removeListener(type,item)
        })
    }else {
        // 只有一个回调则直接执行
        handler.callback.apply(this,args)
        if(handler.once) this.events.delete(type);
    }
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