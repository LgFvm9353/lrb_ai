console.log('start')
const promise1 = Promise.resolve('First promise')
const promise2 = Promise.resolve('Second promise')
const promise3 = new Promise(resolve => {
    resolve('Third promise')
}).then(res => {
    console.log(res)
})
console.log('end')
