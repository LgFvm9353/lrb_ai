import axios from "axios"; // http请求库

const BASE_URL = 'https://api.github.com' // 基础地址

// axios 标准的http请求库，封装了http请求的方法，比如get、post、put、delete等
// 返回一个Promise 更加现代 
// api 模块 应用之外 
export const getRepos = (username) => {
    return axios.get(`${BASE_URL}/users/${username}/repos`);
}

export const getRepoDetail = async (username, repoName) => {
    return await axios.get(`${BASE_URL}/repos/${username}/${repoName}`)
}
