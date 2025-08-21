// # 红绿灯
// 同步阻塞
// 轮询
// 

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
    console.log('begin');
    // 异步变同步
    await sleep(2000);
    console.log('end');
})()


