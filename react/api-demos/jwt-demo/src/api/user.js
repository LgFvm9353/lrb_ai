import axios from './config'

export const getUser = ()=>{
    return axios.get('/user')  
}

export const getUserArticles = ()=>{
    return axios.get('/user/articles')
}

export const doLogin = (data) =>{
    return axios.post('/login',data)
}