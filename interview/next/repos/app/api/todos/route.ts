import {
    NextResponse 
} from 'next/server'   // api server

// ts 是 js的超集
// 引入类型声明文件前面要加一个type，这是es模块化的规定
import { type Todo } from '@/app/types/todo';

let todos:Todo[] = [
    {
        id: 1,
        text: 'todo 1',
        completed: false
    },
    {
        id: 2,
        text: 'todo 2',
        completed: true
    }
]

// restful 一切皆资源
// 向用户暴露资源的
// method + 资源url定义规则
export async function GET(){
    return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { text } = await request.json();
  const newTodo = {
    id: todos.length + 1,
    text,
    completed: false
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}


export async function PUT(request: Request) {
  const data = await request.json();
  todos = todos.map(todo =>{
    return todo.id === data.id ? {...todo,completed: data.completed} : todo
  })
  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  todos = todos.filter(todo => todo.id !== id);
  return NextResponse.json(todos);
}
