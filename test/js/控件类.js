// function Widget(width,height){
//     this.width=width||50;
//     this.height = height||50;
//     this.$elem = null;
// }
// Widget.prototype.render = function($where){
//     if(this.$elem){
//         this.$elem.css({
//             width: this.width + "px",
//             height: this.height + "px"
//         }).appendTo($where);
//     }
// };
// //子类
// function Button(width,height,label){
//     //调用 super 构造函数
//     Widget.call(this,width,height);
//     this.label = label || "Default";
//     this.$elem = $("<button>").text(this.label);
// }
// //让 Button 继承 Widget
// Button.prototype = Object.create(Widget.prototype);
// //重写render
// Button.prototype.render = function($where){
//     //“super”调用
//     Widget.prototype.render.call(this,$where);
//     this.$elem.click(this.onClick.bind(this));
// }
// Button.prototype.onClick = function(evt){
//     console.log("Button '" + this.label + "' clicked.");
// }
// $(document).ready(function(){
//     const $body = $(document.body);
//     const btn1 = new Button(125,30,"Hello");
//     const btn2 = new Button(50,100,"World");
//     btn1.render($body);
//     btn2.render($body);
// })


//class语法糖
class Widget{
    constructor(width,height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where){
        if(this.$elem){
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
}

class Button extends Widget{
    constructor(width,height,label){
        super(width,height);
        this.label = label || "Default";
        this.$elem = $("<button>").text(this.label);
    }
    render($where){
        super.render($where);
        this.$elem.click(this.onClick.bind(this));
    }
    onClick(evt){
        console.log("Button '" + this.label + "' clicked.");
    }
}

$(document).ready(function(){
    const $body = $(document.body);
    const btn1 = new Button(125,30,"Hello");
    const btn2 = new Button(50,100,"World");
    btn1.render($body);
    btn2.render($body);
})