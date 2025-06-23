// 如何用闭包优化fib
function memoizedFib(){
    const cache = {};
    return function fib(n){
        if(n<=1) return n;
        else if(cache[n]) return cache[n];
        else{
            cache[n] = fib(n-1) + fib(n-2);
            return cache[n];
        }
    }
}
console.log(memoizedFib()(10)); // 55