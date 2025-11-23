import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token');
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/casos') && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === '/login' && accessToken) {
        return NextResponse.redirect(new URL('/casos', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/casos/:path*', '/login'],
};
