class Storage{
    constructor(){
        // 第一次调用时Storage.instance为undefined
        if(!Storage.instance){
            // 将当前实例赋值给静态属性
            Storage.instance = this;
        }
        // 后续调用都返回同一个实例
        return Storage.instance;
    }
    setItem(key,value){
        localStorage.setItem(key,value);
    }
    getItem(key){
        return localStorage.getItem(key);
    }
    removeItem(key){
        localStorage.removeItem(key);
    }
    clear(){
        localStorage.clear();
    }
}
const storage = new Storage();
const storage2 = new Storage();
