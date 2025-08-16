# 秋招面试


## JS
- 深拷贝与浅拷贝
- = JS 内存相关
- 拷贝（简单数据类型 复印了一份） 和引用式赋值

- 响应式底层
   - Object.definProperty()
   - Proxy 

## Git 
开发环境中如何使用git的
- 安装开发环境
  - node
  - git 环境
  - 公司会发放一个git 账号，私有项目

- git config --global user.name "yourname"
- git config --global user.email "youremail@example.com"

- 入职 git clone 公司代码
   - 主分支 main/master
      所有人都在用的，线上分支 
   - 新开一个分支 
      git checkout -b 分支名
      在自己的工作任务分支

- 常用命令
   git pull origin main 每天上班前的动作
   git status 当前git 状态
   git log --online  查看提交记录
   git add .  把当前目录下的所有文件添加到暂存区
   git commit -m "提交信息"  提交到本地仓库
   git push origin 分支名  把本地分支推送到远程分支

- 场景
  - 回退
  git restore --staged 文件名  把暂存区的文件取消暂存
  git restore 文件名  把文件恢复到未修改状态
  git reset --hard  回退到指定的提交版本
  git reset --soft  回退到指定的提交版本，但是保留暂存区的文件
  git reset --mixed  回退到指定的提交版本，但是保留工作区的文件


