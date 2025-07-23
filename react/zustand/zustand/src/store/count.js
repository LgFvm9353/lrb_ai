import {create} from 'zustand'

// use 开头 hook
export const useCountStore = create((set) => ({
    // 对象
    // 状态
    // 修改状态的方法
    count : 0,
    // reducer 函数 规定状态怎么变
    inc :()=> {
        set((state) => ({count:state.count + 1}))
    },
    dec :()=> {
        set((state) => ({count:state.count - 1}))
    },

}))