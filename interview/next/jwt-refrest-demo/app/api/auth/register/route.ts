import {
    NextRequest,
    NextResponse,
}from 'next/server'

import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { 
    emailRegex, 
    passwordRegex 
} from '@/lib/regexp'

// restful API
export async function POST(req: NextRequest) {
    // 容错处理，稳定为主
    try{
      const {email, password} = await req.json()
      // 正则表达式 
      if(!email || !emailRegex.test(email)){
        return NextResponse.json({
          error: '邮箱格式错误'
        },{
            status: 400
        })
      }
      if(!password || !passwordRegex.test(password)){
        return NextResponse.json({
          error: '密码输入有误'
        },{
            status: 400
        })
      }

      // 检测邮箱是否已经注册
      const existingUser = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if(existingUser){
        return NextResponse.json({
          error: '邮箱已注册'
        },{
            status: 409
        })
      }
       await prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10)
        }
      })
      return NextResponse.json({
        message: '注册成功'
        }, {
        status: 201
        })
    }catch(err){
       return NextResponse.json({
            error: '服务器内部错误'
        }, {
            status: 500
        })
    }finally{
        // 释放数据库对象
        await prisma.$disconnect()
    }
}
