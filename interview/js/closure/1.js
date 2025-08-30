function createCounter(){
    let count = 0

    return {
        inc: ()=> ++count,
        get: ()=> count
    }
}
const counter = createCounter()
console.log(counter.inc())
console.log(counter.get())
