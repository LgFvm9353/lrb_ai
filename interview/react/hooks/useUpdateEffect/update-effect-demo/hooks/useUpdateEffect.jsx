import {
    useEffect,
    useRef
} from 'react'

function useUpdateEffect(callback, dependencies) {
    // 第一次渲染不执行
    const isMounted = useRef(false)
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        callback()
    }, dependencies)
}


export default useUpdateEffect
