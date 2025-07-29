import { create } from 'zustand'
import { getDetail } from '@/api/detail'

const useDetailStore = create((set, get) => {
  return {
    detail: {
      title: '',
      desc: '',
      images: [
          {
            // 为什么要给初始值？避免在请求接口的这段时间内页面空白
              alt: '',
              url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp'
          }
      ],
      price: ''
  }, 
    loading: false, // 加载状态，用于控制加载动画的显示与隐藏，初始值为false，表示不显示加载动画。当需要显示加载动画时，将loading的值设置为true，当加载完成后，将loading的值设置为false，这样就可以控制加载动画的显示与隐藏。
    getDetail: async (id) => { // 商品详情
      set({loading: true}) // 加载中，显示加载动画
      const res = await getDetail(id) // 调用接口
      set({
        loading: false, // 加载完成，隐藏加载动画，更新数据
        detail: res.data
      }) // 拿到数据后，更新状态
    }
  }
})

export default useDetailStore