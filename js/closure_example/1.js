function CreateCounter(num) {
    // 对外的接口
    // 对内的私有
    this.num = num;
    // 私有变量 private
    let count = 0;
    return {
        increment: function () {
            count++;
        },
        decrement: function () {
            count--;
        },
        getCount: function () {
            return count;
        }
    }
}
let obj = new CreateCounter(5)
obj.increment();
console.log(obj.getCount());
// 闭包延长了变量的生命周期，变量可以被函数访问，函数可以访问变量。
