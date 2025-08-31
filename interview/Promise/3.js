Promise.MyAll = function(promises) {
    return new Promise((resolve, reject) => {
        const res = [];
        let count = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p).then(
                value => {
                    res[i] = value;
                    if (++count === promises.length) resolve(res);
                },
                reject
            )
        });
    });
}

Promise.MyRace = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise.resolve(p).then(resolve, reject);
        });
    });
}

Promise.MyAny = function(promises) {
    return new Promise((resolve, reject) => {
        let errors = [];
        promises.forEach((p, i) => {
            Promise.resolve(p).then(
                resolve,
                err => {
                    errors[i] = err;
                    if (errors.length === promises.length) {
                        reject(errors);
                    }
                }
            );
        });
    });
}

Promise.MyAllSettled = function(promises) {
    return new Promise((resolve) => {
        const res = [];
        let count = 0;
        
        promises.forEach((p, i) => {
            Promise.resolve(p).then(
                value => res[i] = { status: 'fulfilled', value },
                reason => res[i] = { status: 'rejected', reason }
            ).finally(() => {
                if (++count === promises.length) resolve(res);
            });
        });
    });
}

const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = new Promise(r => setTimeout(() => r(3), 100));

Promise.MyAllSettled([p1, p2, p3]).then(console.log);
Promise.MyAll([p1, p2, p3]).then(console.log).catch(err=>{
    console.log(err);
});
Promise.MyRace([p1, p2, p3]).then(console.log).catch(err=>{
    console.log(err);
});
Promise.MyAny([p1, p2, p3]).then(console.log).catch(err=>{
    console.log(err);
});
