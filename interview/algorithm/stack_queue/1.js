class Queue{
    constructor(){
        this.stack1 = []
        this.stack2 = []
    }
    enqueue(x){
        this.stack1.push(x)
    }
    dequeue(){
        if (this.stack2.length === 0){
            while (this.stack1.length > 0){
                this.stack2.push(this.stack1.pop())
            }
        }
        return this.stack2.pop()
    }
    isEmpty(){
        return this.stack1.length === 0 && this.stack2.length === 0
    }
    size(){
        return this.stack1.length + this.stack2.length
    }
    front(){
        if (this.stack2.length === 0){
            while (this.stack1.length > 0){
                this.stack2.push(this.stack1.pop())
            }
        }
        return this.stack2[this.stack2.length - 1]
    }
    back(){
        if (this.stack1.length === 0){
            while (this.stack2.length > 0){
                this.stack1.push(this.stack2.pop())
            }
        }
        return this.stack1[this.stack1.length - 1]
    }
    
}