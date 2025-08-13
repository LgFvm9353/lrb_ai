const target = {
    field1: 1,
    field2: undefined,
    field3: 'hxt',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    },
    filed5: [2, 4, 8]
}
target.target = target; // 循环引用

// WeakMap 的键只能是对象，且是弱引用
// 弱引用意味着如果对象如果没有其他强引用指向它，那么垃圾回收机制会自动回收该对象所占的内存，不考虑该对象是否还在WeakMap中作为键存在

function clone(target,map = new WeakMap()) {
  
    if (typeof target === 'object') {
        if (map.has(target)) {
            return map.get(target);
        }
        let cloneTarget = Array.isArray(target)?[]:{};
        map.set(target,cloneTarget);

        for (const key in target) {
            // 判断 target 对象是否 自身拥有 名为 key 的属性，不考虑从原型链继承的属性
            if (Object.prototype.hasOwnProperty.call(target, key)) {
                cloneTarget[key] = clone(target[key], map);
            }
        }
        return cloneTarget;
    } else {
        return target
    }
}

console.log(clone(target));