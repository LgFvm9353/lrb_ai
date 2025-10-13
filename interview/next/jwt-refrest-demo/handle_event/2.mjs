class EventEmitter {
    constructor() {
        // 维护callbacks 订阅者
        this.events = {}
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(...args))
        }
    }
    // 取消订阅
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
        }
    }
    // 取消所有订阅
    offAll(eventName) {
        if (this.events[eventName]) {
            this.events[eventName] = []
        }
    }

}

const ws = new EventEmitter()
ws.on('aaa',()=>{
    console.log('aaa')
})
ws.emit('aaa')
ws.off('aaa',()=>{
    console.log('aaa')
})
ws.emit('aaa')
