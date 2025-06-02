//

//父类
function Controller(){
    this.err = [];
}
Controller.prototype.showDialog = function(){
   //给用户显示标题和信息
}
Controller.prototype.success = function(msg)
{
    this.showDialog('success',msg);
}
Controller.prototype.failure = function(err)
{
    this.errors.push(err);
    this.showDialog('Error',err);
}

//子类
function LoginController(){
    Controller.call(this);
}
//把子类关联到父类
LoginController.prototype = Object.create(Controller.prototype);
//获取用户名和密码
LoginController.prototype.getUser = function(){
    return document.getElementById('login_username').value;
}
LoginController.prototype.getPassword = function(){
    return document.getElementById('login_password').value;
}
LoginController.prototype.validateEntry = function(user,pw){
   user = user || this.getUser();
   pw = pw || this.getPassword();
   if(!(user && pw)){
      return  this.failure('Please enter a username and password');
   }
   else if(pw.length < 5)
   {
       return this.failure('Password must be at least 5 characters');
   }
   return true;
}

//重写基础的failure
LoginController.prototype.failure = function(err){
   // super 调用
   Controller.prototype.failure.call(this,'Login invalid'+err);
}
//子类
function AuthController(login){
    //Controller 构造函数初始化了一个空数组 this.err ，通过调用 Controller.call(this); ， AuthController 的每个实例都会拥有自己的 err 数组
    Controller.call(this);
    this.login = login;
}
//把子类关联到父类
AuthController.prototype = Object.create(Controller.prototype);

AuthController.prototype.sever = function(url,data){
   return $.ajax({url:url,data:data});
}
AuthController.prototype.checkAuth = function(){
    var user = this.login.getUser();
    var pw = this.login.getPassword();
    if(this.login.validateEntry(user,pw)){
       this.sever('/check.auth',{
           user:user,
           pw:pw
       }).then(this.success.bind(this))
       .fail(this.failure.bind(this));
    }
}
//重写基础的success
AuthController.prototype.success = function(){
    // super 调用
    Controller.prototype.success.call(this,'Authenticated');
}
//重写基础的failure
AuthController.prototype.failure = function(err){
    // super 调用
    Controller.prototype.failure.call(this,'Auth Fail'+err);
}
var auth = new AuthController(
    //除了继承，我们还要合成
    new LoginController()
);
auth.checkAuth();