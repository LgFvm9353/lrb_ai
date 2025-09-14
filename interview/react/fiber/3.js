// 全局任务对象，一个要处理的任务单元(fiber 节点)
let nextUnitOfWork = null

function performUnitOfWork(fiber)
{
    // 1. 挂载
    // 当前fiber 对应真实DOM 
    if(!fiber.dom)
    {
        fiber.dom = createDomFromFiber(fiber)
    }
    const elements = fiber.props.children
    let index = 0
    let prevSibling = null

    while(index < elements.length)
    {
        const element = elements[index]
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
            sibling: null,
            child: null
        }
        if(index === 0)
        {
            fiber.child = newFiber
        }else{
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
    // 2. 子节点
    if(fiber.children){
        return fiber.child
    }
   // 如果没有子节点，找兄弟节点
   while(next)
   {
      if(fiber.sibling){
        return fiber.sibling
      }
      fiber = fiber.parent
   }
   return null
}
function workLoop(deadline)
{
    let shouldYield = false    // 不中断
    while(nextUnitOfWork && !shouldYield){
        // 指针的操作
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        // 避免浏览器阻塞1ms
        shouldYield = deadline.timeRemaining() < 1
    }
    // 模拟实现 schedule 任务调度机制
    requestIdleCallback(workLoop)   
}
