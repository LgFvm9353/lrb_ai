const str = '我的手机号是13888888888'
const reg = /1[3-9][0-9]{9}/;      // 简写方式 
console.log(reg.test(str))
console.log(str.match(reg))

const str3 = '我的名字是{name}'
console.log(str3.replace(/\{name\}/,'归于尽'))