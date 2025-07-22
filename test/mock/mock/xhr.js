// 保存原生 XHR 构造函数
const originalXHR = window.XMLHttpRequest;
const that = this;
// 重写全局 XHR 构造函数
window.XMLHttpRequest = function() {
  const xhr = new originalXHR();
  // 保存原生 open和send方法
  const originalOpen = xhr.open;
  const originalSend = xhr.send;
  
  // 重写 open 记录请求信息
  xhr.open = function(method, url) {
    // 记录请求方法和 URL（关键：用于后续匹配 Mock 规则）
    this._method = method.toUpperCase();
    this._url = url;
    // 调用原生 open 方法
    return originalOpen.apply(this, arguments);
  };
  
  // 重写 send 进行拦截
  xhr.send = function(body) {
    // 查找匹配的规则
    const matched = that.rules.find(rule => 
      rule.url === this._url && rule.method === this._method
    );
    
    if (matched) {
      // 模拟异步响应
      setTimeout(() => {
        // 1. 先设置 readyState 为 4
        Object.defineProperty(this, 'readyState', {
          value: 4,
          configurable: true
        });
        
        // 2. 设置响应数据
        Object.defineProperty(this, 'responseText', {
          value: JSON.stringify(matched.response()),
          configurable: true
        });
        
        // 3. 设置状态码
        Object.defineProperty(this, 'status', {
          value: 200,
          configurable: true
        });
        
        // 4. 设置响应头 (axios会检查这个)
        this.getAllResponseHeaders = () => {
          return 'Content-Type: application/json';
        };
        
        // 5. 触发事件
        if (typeof this.onreadystatechange === 'function') {
          this.onreadystatechange();
        }
        
        this.dispatchEvent(new Event('readystatechange'));
        this.dispatchEvent(new Event('load'));
      }, matched.delay || 0);
    } else {
      return originalSend.call(this, body);
    }
  };
  
  return xhr;
};