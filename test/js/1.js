// function setupBot(name, selector) {
//     $(selector).click(function activator() {
//         console.log("activating: " + name);
//     })
// }
// setupBot("Closure Bot 1", "#bot_1");
// setupBot("Closure Bot 2", "#bot_2");


// for(let i=0;i<5;i++)
// {
//     setTimeout(function(){
//         console.log(i);
//     },1000)
// }

// for(var i=0;i<5;i++)
// {
//     ((j)=>{
//         setTimeout(function(){
//             console.log(j);
//         },1000)
//     })(i)
// }
// var MyModules = (function Manager() {
//     var modules = {};
//     function define(name, deps, impl) {
//         for (var i = 0; i < deps.length; i++) {
//             deps[i] = modules[deps[i]];
//         }
//         modules[name] = impl.apply(impl, deps);
//     }
//     function get(name) {
//         return modules[name];
//     }
//     return {
//         define: define,
//         get: get
//     };
// })();

// MyModules.define("bar",[],function(){
//     function hello(who)
//     {
//         return "Let me introduce:"+who;
//     }
//     return {
//         hello: hello
//     };
// })
// MyModules.define("foo",["bar"],function(bar){
//     var hungry = "hippo";
//     function awesome()
//     {
//         console.log(bar.hello(hungry).toUpperCase());
//     }
//     return {
//         awesome: awesome
//     };
// });
// var bar = MyModules.get("bar");
// var foo = MyModules.get("foo");
// console.log(bar.hello("hippo"));
// foo.awesome();


function foo(num)
{
    console.log("foo:"+num);
    this.count++;
}
foo.count = 0;
var i;
for(i=0;i<10;i++)
{
    if(i>5)
    {
        foo(i);
    }
}
count = 0;
console.log(foo.count);
console.log(count);
console.log(global.count)