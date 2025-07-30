import {create} from 'zustand'
import {getImages} from '@/api/home'

const useImageStore = create((set,get) => ({
    images: [], // 图片数据
    page: 1, 
    pageSize: 10, 
    loading: false, // 加载状态
    hasMore: true, // 是否还有更多图片
    fetchImages: async () => { // 获取图片数据的方法
        if (get().loading || !get().hasMore) return // 如果正在加载或者没有更多图片，直接返回
        set({ loading: true }) // 设置加载状态为 true
        const res = await getImages(get().page, get()?.pageSize) 
        console.log(res)
        // 之前的状态
        // set((state) => ({
        //     images: [...state.images, ...newImages],
        //     page: state.page + 1,
        //     loading: false
        // }))
        set({ // 更新图片数据和分页信息
            images: [...get().images, ...res.data], // 合并旧数据和新数据
            page: get().page + 1, // 更新页码
            hasMore: res.data.length > 0, // 判断是否还有更多图片
            loading: false // 设置加载状态为 false
        })
        
    }
}))

export default useImageStore