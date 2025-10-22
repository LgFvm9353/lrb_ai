const arr  = Array.from({length: 3},(_,i) => i)
console.log(arr)

if(arr.includes(1))
{
    console.log('includes 1')
}
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000);
})
p.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})
