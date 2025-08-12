const target = {a:1}
const source = {b:2}

const result = Object.assign(target,source)

console.log(target,source,result)
result.a = 11

console.log(target,source,result)