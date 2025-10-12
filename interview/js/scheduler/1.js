class TaskSchedule{
    constructor(maxConcurrency = 2){
        this.maxConcurrency = maxConcurrency
        this.runningCount = 0    // 正在执行的任务数量
        this.taskQueue = []      // FIFO 队列
    }
    addTask(task){
        return new Promise((resolve,reject)=>{
            const run = ()=>{
                this.runningCount++;
                task()
                .then(resolve)
                .catch(reject)
                .finally(()=>{
                    this.runningCount--;
                    this.schedule()
                })
            }
            this.taskQueue.push(run)
            this.schedule()
        })
    }
    schedule(){
        while (this.runningCount < this.maxConcurrency && this.taskQueue.length > 0)
        {
            const nextTask = this.taskQueue.shift()
            nextTask()
        }
    }
}


const task1 = () => new Promise(resolve =>{
    setTimeout(() =>{
        console.log('任务1执行')
        resolve(1)
    },1000)
})
const task2 = () => new Promise(resolve =>{
    setTimeout(() =>{
        console.log('任务2执行')
        resolve(2)
    },2000)
})
const task3 = () => new Promise(resolve =>{
    setTimeout(() =>{
        console.log('任务3执行')
        resolve(3)
    },1500)
})


const schedule = new TaskSchedule()
schedule.addTask(task1)
schedule.addTask(task2)
schedule.addTask(task3)



