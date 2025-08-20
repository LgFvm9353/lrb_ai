import {
    ref,
    onMounted,
    onUnmounted,
    computed  // 计算属性
} from 'vue'

export function useTodo(){
    let title = ref('')
    let todos = ref([
        {
            title: 'todo1',
            done: false
        }
    ])
   function addTodo(){
     todos.value.push({
        title: title.value,
        done: false
     })
     title.value = ''
   }
   function clear(){
     // done false 留下，已完成的清除
     todos.value=todos.value.filter(item=>!item.done)
   }
   let active = computed(()=>{
      return todos.value.filter(item=>!item.done).length

   })
   let all = computed(()=> todos.value.length)
   let allDone = computed({
       get: function(){
           return active.value === 0 
       },
       set: function (val){
         todos.value.forEach(todo=>{
            todo.done = val
         })
       }
   })

    return {
        title,
        todos,
        addTodo,
        clear,
        active,
        all,
        allDone
    }
}