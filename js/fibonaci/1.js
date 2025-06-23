// 斐波那契列函数
// 递归
// 相似的问题  
// 自顶向下的思考 问题的终点
// 退出条件
// 重复计算
// 树状结构
function fib(n)
{
    if(n <=1 )  return n;
    else return fib(n-1) + fib(n-2);
}
console.log(fib(10)); // 55