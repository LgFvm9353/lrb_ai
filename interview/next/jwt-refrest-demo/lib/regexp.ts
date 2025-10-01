// 正则 符号数学
const emailRegex = /^.+@.+\..+$/
// 6-18 位，不能是简单数字
const passwordRegex = /^(?!^\d+$)^[a-zA-Z0-9!@#$%^&*]{6,18}$/
export {
    emailRegex,
    passwordRegex
}