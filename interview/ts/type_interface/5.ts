interface AddFn{
    (a:number,b:number):number
}

const add:AddFn = (a,b) => {
    return a+b
}

type addType = (a:number,b:number) => number
const add2:addType = (a,b) => {
    return a+b
}