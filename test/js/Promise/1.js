// 优化版 EventEmitter 实现

function EventEmitter(maxListeners = 10) {
    this.events = new Map();
    this.maxListeners = maxListeners;
}

// 回调包装函数
const wrapCallback = (fn, once = false) => ({
    callback: fn,
    once,
});

EventEmitter.prototype.addListener = function (type, fn, once = false) {
    // 事件名称验证
    if (typeof type !== 'string') {
        throw new TypeError('Event type must be a string');
    }
    
    // 回调函数检查
    if (typeof fn !== 'function') {
        throw new TypeError('Listener must be a function');
    }
    
    let handler = this.events.get(type);
    
    if (!handler) {
        this.events.set(type, wrapCallback(fn, once));
    } else if (typeof handler.callback === 'function') {
        this.events.set(type, [handler, wrapCallback(fn, once)]);
        
        // 首次转为数组时检查最大监听器数
        if (this.maxListeners > 0 && this.events.get(type).length > this.maxListeners) {
            console.warn(`Possible EventEmitter memory leak detected for event "${type}". ${this.events.get(type).length} listeners added.`);
        }
    } else {
        handler.push(wrapCallback(fn, once));
        
        // 检查最大监听器数
        if (this.maxListeners > 0 && handler.length > this.maxListeners) {
            console.warn(`Possible EventEmitter memory leak detected for event "${type}". ${handler.length} listeners added.`);
        }
    }
    
    // 支持链式调用
    return this;
};

EventEmitter.prototype.removeListener = function (type, listener) {
    // 事件名称验证
    if (typeof type !== 'string') {
        throw new TypeError('Event type must be a string');
    }
    
    // 验证 listener 是否为有效包装对象
    if (!listener || typeof listener.callback !== 'function') {
        return this;
    }
    
    let handler = this.events.get(type);
    if (!handler) return this;
    
    if (!Array.isArray(handler)) {
        if (handler.callback === listener.callback) {
            this.events.delete(type);
        }
    } else {
        for (let i = 0; i < handler.length; i++) {
            let item = handler[i];
            if (item.callback === listener.callback) {
                handler.splice(i, 1);
                i--;
                if (handler.length === 1) {
                    this.events.set(type, handler[0]);
                }
            }
        }
    }
    
    // 支持链式调用
    return this;
};

EventEmitter.prototype.once = function (type, fn) {
    // 事件名称验证和回调函数检查通过 addListener 完成
    this.addListener(type, fn, true);
    return this; // 支持链式调用
};

EventEmitter.prototype.emit = function (type, ...args) {
    // 事件名称验证
    if (typeof type !== 'string') {
        throw new TypeError('Event type must be a string');
    }
    
    let handler = this.events.get(type);
    if (!handler) return false;
    
    if (Array.isArray(handler)) {
        // 创建副本防止删除导致的遍历问题
        const handlers = [...handler];
        handlers.forEach(item => {
            item.callback.apply(this, args);
            if (item.once) this.removeListener(type, item);
        });
    } else {
        handler.callback.apply(this, args);
        if (handler.once) this.events.delete(type);
    }
    
    return true;
};

EventEmitter.prototype.removeAllListener = function (type) {
    // 事件名称验证
    if (typeof type !== 'string') {
        throw new TypeError('Event type must be a string');
    }
    
    if (type) {
        this.events.delete(type);
    } else {
        // 清空所有事件
        this.events.clear();
    }
    
    return this; // 支持链式调用
};

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