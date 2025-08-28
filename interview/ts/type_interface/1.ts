// js 是弱类型
// ts 给js 带来类型的约束
// ts 是微软开发的
// react + ts 是开发的标配
// 自定义类型
// interface 关键字
interface User{
    name:string,
    age:number
}

type UserType = {
    name:string,
    age:number
}

const u1:User = {
    name:'张三',
    age:18
}

const u2:UserType = {
    name:'张三',
    age:18
}