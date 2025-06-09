//配置
//电影接口地址
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
//DOM 编程 原生JS
//返回一个DOM节点对象
const oForm = document.querySelector('#form');
const oInput = document.querySelector('.search');
console.log(oForm);
console.log(typeof oForm);
console.log(Object.prototype.toString.call(oForm));

// 获取电影
const getMovies = async function (search) {
    let reqUrl = '';
   if(search){
        reqUrl = SEARCH_API + search;
   }else{
     reqUrl = API_URL;
   }
   fetch(reqUrl)
        //第一个then处理http响应，将响应解析为json
        .then(res => {
            if(!res.ok){
                throw new Error('网络错误')
            }
            return res.json()} )
        //第二个then处理json数据，将数据渲染到页面中
        .then(data => {
            // console.log(data);
          showMovies(data.results);
        })
}
const main = document.querySelector('#main');
const showMovies = function (movies) {
   main.innerHTML = '';
   main.innerHTML = movies.map(movie => {
       const {poster_path,title,vote_average,overview} = movie;
        return `
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>
        `}).join('')
}
// 页面加载完成之后执行
window.onload = function () {
    getMovies();
}
oForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const search = oInput.value.trim();
   if(search){
      getMovies(search)
   }
})




