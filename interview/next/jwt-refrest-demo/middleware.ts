import {
    NextRequest,
    NextResponse
} from 'next/server'

import { verifyToken } from '@/lib/jwt'
const protectedPath = [
    '/dashboard',
    '/profile',
]
export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    // 不是受保护的
    if(!protectedPath.some(p=>path.startsWith(p)))
        return NextResponse.next()

    // 检查是否已经登录
    const accessToken = req.cookies.get('access_token')?.value
    const refreshToken = req.cookies.get('refresh_token')?.value
    if(!accessToken && !refreshToken)
        return NextResponse.redirect(new URL('/login', req.url))
    // 检查 accessToken 是否过期
    if(accessToken){
        const accessTokenPayload = await verifyToken(accessToken)
        if(accessTokenPayload){
            const requestHeaders = new Headers(req.headers)
            requestHeaders.set('x-user-id', accessTokenPayload.userId as string)
            return  NextResponse.next({
                request: {
                    headers: requestHeaders,
                }
            })
        }
    }
    // 检查 refreshToken 是否过期, accessToken 过期了,无感刷新
    if(refreshToken){
        const refreshTokenPayload = await verifyToken(refreshToken)
        if(refreshTokenPayload){
        //    const userId = refreshTokenPayload.userId as string
           const refreshUrl = new URL('/api/auth/refresh', req.url)
           refreshUrl.searchParams.set('redirect', req.url)
           return NextResponse.redirect(refreshUrl)
        }
    }
}