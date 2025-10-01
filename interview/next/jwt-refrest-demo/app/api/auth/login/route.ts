import {
    NextRequest,
    NextResponse
} from 'next/server'

import {prisma} from '@/lib/db'
import { 
    emailRegex, 
    passwordRegex 
} from '@/lib/regexp'
import bcrypt from 'bcryptjs'
import { 
    createTokens,
    setAuthCookie
 } from '@/lib/jwt'


export async function POST(request:NextRequest){
    try{
        const {email, password} = await request.json()
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
        // 检测邮箱是否注册
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user){
            return NextResponse.json({
                error: '用户不存在'
            },{
                status: 401
            })
        }
        // 检测密码是否正确
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return NextResponse.json({
                error: '密码错误'
            },{
                status: 401
            })
        }
        // 登录成功，返回 jwt 令牌
        const {accessToken, refreshToken} = await createTokens(user.id)
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        })
        // 保存到cookie中
        await setAuthCookie(accessToken, refreshToken)
        return NextResponse.json({
            message: '登录成功'
        }, {
            status: 200
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