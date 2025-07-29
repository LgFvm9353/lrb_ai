import React from 'react'
interface Props{
    userName:string;
    // typescript 除了内置的类型还有自定义类型
    // react 提供的类型 事件类型 ChangeEvent
    // type = 'radio' type='checkbox'
    // HTMLInputElement event.target.value?
    // 重要的地方约束 不会出错 
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}
const NameEditComponent:React.FC<Props> = (props) => {
   return (
    <>
      <label>Update name：</label>
      <input type="text" value={props.userName} onChange={props.onChange}/>
    </>
   )
}
export default NameEditComponent