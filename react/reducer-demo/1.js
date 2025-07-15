// 纯函数
// 相同的输入永远会得到相同的输出，而且没有任何可观察的副作用（不操作外部变量、不发送请求、不改DOM）
// function add(a,b)
// {
//     return a+b
// }

// 管理数据状态用传函数去管理 全局状态更正确
function add(a,b,obj)
{
    obj.item = '111'
    return a+b
}

// 不纯的
let total = 0
function addToTotal(a)
{
    total+=a
    return total
}
