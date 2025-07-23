import { useCountStore } from "../../store/count"
const Counter = ()=>{
    const {
        count,
        inc,
        dec,
    } = useCountStore()

    return (
        <>
         {count}
         <button onClick={inc}>+</button>
         <button onClick={dec}>-</button>
        </>
    )
}
export default Counter