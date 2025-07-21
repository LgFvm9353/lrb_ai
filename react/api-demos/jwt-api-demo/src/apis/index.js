import axios from './config'

const BASE_URL = 'http://localhost:5173'
// todos接口
export const getTodos = () => {
    return axios.get('/api/todos')
}

// repos接口
export const getRepos = () => {
    return axios.get('/api/repos')
}