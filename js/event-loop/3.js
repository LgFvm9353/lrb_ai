console.log('start')
process.nextTick(() => {
    console.log('nextTick1')
})
Promise.resolve().then(() => {
    console.log('promise')
})
setTimeout(() => {
    console.log('setTimeout')
    process.nextTick(() => {
        console.log('nextTick2')
    })
})
console.log('end')
