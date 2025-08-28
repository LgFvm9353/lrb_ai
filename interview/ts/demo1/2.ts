// 泛型去声明一个链表
// 数据结构，ADT
// 支持泛型的节点，可以接受value 类型的传参
class NodeItem<T>{
    value:T
    next:NodeItem<T> | null = null
    constructor(value:T){
        this.value = value
    }
}
// 链表的操作
class LinkedList<T>{
    head:NodeItem<T> | null = null
    append(value:T){
        const node = new NodeItem(value)
        if(this.head === null){
            this.head = node
        }else{
            let current = this.head
            while(current.next){
                current = current.next
            }
            current.next = node
        }
    }
}
const numberList = new LinkedList<number>()
numberList.append(1)
numberList.append(2)
numberList.append(3)
    