const target = {
    field1: 1,
    field2: undefined,
    field3: 'hxt',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
}

// console.log(JSON.parse(JSON.stringify(target)));
function clone(source) {
    if (typeof source === 'object') {
        let cloneTarget = {}; // 分配新空间
        for (const key in source) { // 遍历
            cloneTarget[key] = source[key];
        }

    } else {
        return source;
    }
}
console.log(clone(target))