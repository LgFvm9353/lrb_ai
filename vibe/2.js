function Person(name,age)
{
  this.name = name;
  this.age = age;
}
Person.prototype = {
    constructor : Person,
    sennFlower(girl){
        console.log(this.name+'给'+girl.name+'送了99玫瑰');
    },
    receiveFlower(sender){
        console.log(this.name+'收到了'+sender.name+'送的花');
    }
}
const hxt = new Person('黄新天',20);
hxt.prototype = {
    constructor : hxt,
    tall: 187,


}
console.log(hxt.prototype);
