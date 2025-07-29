import { useState } from 'react'
import './App.css'
import HelloComponent from './components/HelloComponent'
// react + typescript
// javascript 可能会有些问题？主要因为js是弱类型的
// jsx 后缀改为 tsx 
function App() {
  // 编译阶段
  // 多写了些类型声明文件
  // 多写一些代码 类型声明 代码质量保驾护航
  let count:number = 0;
  const [str, setStr] = useState<string>('hello world')

  // 元组类型
  const tuple: [number, string] = [1, 'hello']
  // 枚举类型
  // enum Direction {
  //   Up,
  //   Down,
  //   Left,
  //   Right
  // }

  // const direction: Direction = Direction.Up
  // 对象的约束？
  interface User {
    name: string
    age: number
  }
  const user: User = {
    name: '张三',
    age: 18
  }
  
  return (
    <>
      {
        count
      }
      {
        str
      }
      <HelloComponent name='zs'/>
    </>
  )
}

export default App
