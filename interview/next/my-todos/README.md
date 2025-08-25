# Next.js


## supbase


## 数据库开发
- ORM 工具
   不需要写sql 语句，向操作对象一样去操作数据库
    - Prisma
    - typeorm


## Prisma ?
是命令行工具，用于管理数据库 schema、迁移。
schema 是数据库的结构定义，通过 schema 可以定义数据库的表、字段、数据类型、关系和约束等。
Migration 数据库结构变更（建表、改字段）等
不止可以帮助我们操作数据库，还可以为我们的数据库
pnpm i prisma @prisma/client      安装prisma
npx prisma init                    prisma 初始化
npx prisma migrate dev --name init  数据库迁移
