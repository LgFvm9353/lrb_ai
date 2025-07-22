// 保存原生fetch
const originalFetch = window.fetch;
const that = this;

window.fetch = async function(url, options = {}) {
  // 提取请求方法 （默认GET）
  const method = options.method?.toUpperCase() || 'GET';
  //匹配规则
  const matched = that.rules.find(rule => 
    rule.url === url && rule.method === method
  );
  
  if (matched) {
    // 命中规则：返回模拟数据的Response 对象
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
  // 未命中：调用原生 fetch
  return originalFetch(url, options);
};