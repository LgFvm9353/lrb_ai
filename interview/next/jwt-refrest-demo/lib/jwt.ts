import {
    SignJWT,
    jwtVerify,
} from 'jose'

import {
    cookies
} from 'next/headers'

const getJwtSecretKey = (()=>{
    const secret = process.env.JWT_SECRET_KEY
    if(!secret){
        throw new Error('JWT_SECRET_KEY 未配置')
    }
    return new TextEncoder().encode(secret)
})
export const createTokens = async (userId: number) => {
    const accessToken = await new SignJWT({ userId })
        // 创建 jwt 载荷
        // 设置头部，指定使用HS256 算法签名
        .setProtectedHeader({ alg: 'HS256' })
        // 颁发的时间，当前时间
        .setIssuedAt(Date.now())
        .setExpirationTime('15m')
        // 使用secret 签名
        .sign(getJwtSecretKey())
    const refreshToken = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        // 颁发的时间，当前时间
        .setIssuedAt(Date.now())
        .setExpirationTime('7d')
        .sign(getJwtSecretKey())
    return {
        accessToken,
        refreshToken
    }
}

export const setAuthCookie = async ( accessToken: string, refreshToken: string ) => {
    const cookieStore = await cookies()
    cookieStore.set('access_token', accessToken, {
        httpOnly: true,   //不能用JS操作cookie 
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60,  // 15m 
        path: '/',
    })
    cookieStore.set('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,  //7d
        path: '/',
    })
}

export const verifyToken = async (token: string) => {

    try{
        const { payload } = await jwtVerify(token, getJwtSecretKey())
        return payload
    }
    catch(err){
        console.log(err)
        return null
    }
}