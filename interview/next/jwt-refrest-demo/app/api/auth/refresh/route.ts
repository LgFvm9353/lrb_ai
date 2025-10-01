import {
    NextRequest,
    NextResponse
} from 'next/server'
import { 
    verifyToken, 
    createTokens,
    setAuthCookie 
} from '@/lib/jwt'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {

    try{
        const refreshToken = req.cookies.get('refresh_token')?.value
        const redirectURL = req.nextUrl.searchParams.get('redirect') || '/dashboard'
        if(!refreshToken)
           return NextResponse.redirect(new URL('/login', req.url))
        const refreshTokenPayload = await verifyToken(refreshToken)
        if(!refreshTokenPayload || !refreshTokenPayload.userId)
           return NextResponse.redirect(new URL('/login', req.url))
        const userId = refreshTokenPayload.userId as number
        // 刷新？ 数据库
        const user  = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        if(!user || user.refreshToken !== refreshToken)
           return NextResponse.redirect(new URL('/login', req.url))
        // 刷新 token
        const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        } = await createTokens(userId)

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: newRefreshToken,
            }
        })
        // 设置 cookie
        const response = NextResponse.redirect(new URL(redirectURL, req.url))
        await setAuthCookie(newAccessToken, newRefreshToken)
        return response
    }catch(err)
    {
        console.error('刷新 token 失败', err)
        return NextResponse.redirect(new URL('/login', req.url))
    }
   
}