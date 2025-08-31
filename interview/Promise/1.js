const p1 = Promise.resolve('1')
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2')
  }, 1000)
})
console.log(p2) // Promise { <pending> } 

