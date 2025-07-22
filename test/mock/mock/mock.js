// mock.js
export default class SimpleMock {
    constructor() {
      this.rules = []; // 存储 Mock 规则
      this.init(); // 初始化拦截
    }
    
    // 添加 Mock 规则
    addRule(rule) {
      // 标准化方法为大写
      this.rules.push({
        ...rule,
        method: rule.method?.toUpperCase() || 'GET'
      });
    }
    
    // 初始化 XHR 和 fetch 拦截
    init() {
      this.interceptXHR();
      this.interceptFetch();
    }
    
    interceptXHR() {
      const originalXHR = window.XMLHttpRequest;
      const that = this;
  
      window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const originalOpen = xhr.open;
        const originalSend = xhr.send;
        const originalSetRequestHeader = xhr.setRequestHeader;
        
        // 存储请求头
        const requestHeaders = {};
  
        xhr.setRequestHeader = function(header, value) {
          requestHeaders[header] = value;
          return originalSetRequestHeader.apply(this, arguments);
        };
  
        xhr.open = function(method, url) {
          this._method = method.toUpperCase();
          this._url = url;
          this._requestHeaders = requestHeaders;
          return originalOpen.apply(this, arguments);
        };
  
        xhr.send = function(body) {
          const matched = that.rules.find(rule => 
            rule.url === this._url && rule.method === this._method
          );
  
          if (matched) {
            setTimeout(() => {
              // 1. 准备响应数据
              const responseData = JSON.stringify(matched.response());
              
              // 2. 定义关键属性
              Object.defineProperties(this, {
                readyState: { value: 4, configurable: true },
                status: { value: 200, configurable: true },
                statusText: { value: 'OK', configurable: true },
                response: { value: responseData, configurable: true },
                responseText: { value: responseData, configurable: true },
                responseURL: { value: this._url, configurable: true }
              });
  
              // 3. 模拟响应头
              this.getAllResponseHeaders = () => (
                'Content-Type: application/json\r\nX-Powered-By: SimpleMock'
              );
  
              this.getResponseHeader = (name) => {
                const headers = {
                  'Content-Type': 'application/json',
                  'X-Powered-By': 'SimpleMock'
                };
                return headers[name];
              };
  
              // 4. 确保事件按正确顺序触发
              const events = [
                'readystatechange',
                'load',
                'loadend'
              ];
  
              events.forEach(type => {
                const event = new Event(type);
                if (typeof this[`on${type}`] === 'function') {
                  this[`on${type}`](event);
                }
                this.dispatchEvent(event);
              });
            }, matched.delay || 0);
          } else {
            originalSend.call(this, body);
          }
        };
  
        return xhr;
      }
    }
    
    // 拦截 fetch
    interceptFetch() {
      const originalFetch = window.fetch;
      const that = this;
      
      window.fetch = async function(url, options = {}) {
        const method = options.method?.toUpperCase() || 'GET';
        const matched = that.rules.find(rule => 
          rule.url === url && rule.method === method
        );
        
        if (matched) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(new Response(
                JSON.stringify(matched.response()),
                {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
                }
              ));
            }, matched.delay || 0);
          });
        }
        
        return originalFetch(url, options);
      };
    }
  }