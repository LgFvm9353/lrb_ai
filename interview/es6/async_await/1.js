async function foo(){
    const a = await bar()
    return a +1 
}


// 就相当于

function foo(){
    return new Promise((resolve,reject) => {
        bar().then(res => {
            resolve(res + 1)
        }).catch(err => {
            reject(err)
        })
    })
}
