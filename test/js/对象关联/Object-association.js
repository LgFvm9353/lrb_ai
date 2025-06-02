// 用对象关联的方式去优化 classTest的代码 委托模式
const Controller = {
    errors:[],
    getUser: function(){
        return document.getElementById('login_username').value;
    },
    getPassword: function(){
        return document.getElementById('login_password').value;
    },
    validateEntry: function(user,pw){
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if(!(user && pw)){
           return  this.failure('Please enter a username and password');
        }else if(pw.length < 5)
        {
            return this.failure('Password must be at least 5 characters');
        }
        return true;
    },
    showDialog: function(title,msg){
        //给用户显示标题和信息
    },
    failure: function(err){
       this.errors.push(err);
       this.showDialog('Error',"Login invalid"+err);
    }
}
//让AuthController委托LoginController
const AuthController = Object.create(LoginController);
AuthController.errors = [];
AuthController.checkAuth = function(){
    const user = this.getUser();
    const pw = this.getPassword();
    if(this.validateEntry(user,pw)){
        this.server('check-auth',{
            user:user,
            pw:pw
        }).then(this.accepted.bind(this))
        .fail(this.rejected.bind(this))
    }
}
AuthController.server = function(url,data){
    return $.ajax({
        url:url,
        data:data,
    })
};
AuthController.accepted = function(){
    this.showDialog('Success','Authenticated');
};
AuthController.rejected = function(){
    this.failure("Auth Failed"+err);
};
AuthController.checkAuth();

