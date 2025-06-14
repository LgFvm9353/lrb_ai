function add(...args) {
   console.log(args);
   return (...newArgs) =>{
    const arr = [...args,...newArgs];
    console.log(arr);
   }
}
add(1,2,3,4,5,6,7,8,9,10);