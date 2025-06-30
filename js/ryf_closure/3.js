function f1(){
    let n = 999;
    function nAdd(){
        n+=1
    }
    function f2(){
        console.log(n);
    }
    return {nAdd,f2};
}
const {nAdd,f2} = f1();
f2();
nAdd();
f2();