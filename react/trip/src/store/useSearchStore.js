// search 全局共享状态
import {create} from 'zustand'
import { 
    getSuggestList,
    getHotList 
} from '@/api/search'

const useSearchStore = create((set, get) => {
   // get 拿到状态 
   const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
   
   return {
      searchHistory,
      suggestList: [],  // suggestList 返回list
      hotList: [],      // 热门搜索
      setSuggestList: async (keyWord) => { // 搜索框输入时触发
         const res = await getSuggestList(keyWord) // 调用接口
         set({suggestList: res.data.list}) // 拿到数据后，更新状态
      },
      setHotList: async () => { // 页面加载时触发
         const res = await getHotList() // 调用接口
         set({hotList: res.data.list}) // 拿到数据后，更新状态
      }
   }
})

export default useSearchStore