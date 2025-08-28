# type 和 interface

- 相同点
   都可以用来声明类型  自定义类型

- 区别
   1. interface 只能用来声明对象类型  不能用来声明基本类型
   2. type 可以用来声明对象类型  也可以用来声明基本类型
   3. 当需要编写继承类的时候，interface 只要extends 就好，type 使用的是 & 并集
   4. interface 支持多次声明合并，type 不支持