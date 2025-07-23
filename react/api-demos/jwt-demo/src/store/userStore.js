import {create} from 'zustand'
import { doLogin } from '../api/user' 
export const useUserStore = create((set) => ({
    user :null,
    isLogin: false,
    login: async (username="",password="") => {
        const res  = await doLogin({username,password})
        console.log('res'+res.data)
        // const { data: { data: { user, token } } } = res
        const {user,token} = res.data.data
        localStorage.setItem('token', token)
        set({
            user, 
            isLogin: true
        })
    },
    loginOut: () => {
        localStorage.removeItem('token')
        set({
            user: null, 
            isLogin: false
        })
    }

}))