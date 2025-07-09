function debounce(fn,delay){
    fn.id = null;
    return function(...args){
        if(fn.id) clearTimeout(fn.id);
        fn.id = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
let obj = {
    count: 0,
    inc: debounce(function(val){
        this.count += val;
        console.log(this)
        console.log(this.count)
    },500)
}
obj.inc(1)