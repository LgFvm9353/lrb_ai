function *gen1(){
    yield 1;
    yield *gen2();
    yield 4
}

function *gen2(){
    yield 2
    yield 3
}
// const g = gen1()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())


function run(gen) {
  const next = (data) => {
    let res = gen.next(data);
    if(res.done) return;
    // 处理普通值
    if(typeof res.value !== 'function') {
      console.log(res.value);  // 输出yield的值
      next();
    }
    // 处理函数（原逻辑）
    else {
      res.value(next);
    }
  }
  next();
}
// run(gen1());


function runGenerator(genFunc) {
  const gen = genFunc();

  function handle(result) {
    if (result.done) return Promise.resolve(result.value);
    
    return Promise.resolve(result.value)
      .then(res => handle(gen.next(res)))
      .catch(err => handle(gen.throw(err)));
  }

  try {
    return handle(gen.next());
  } catch (err) {
    return Promise.reject(err);
  }
}
runGenerator(gen1).then(res => {
  console.log(res ?? '所有yield已执行'); // 输出最终的结果
});

