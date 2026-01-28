import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /en -> /en/home and /la -> /la/home
  if (routing.locales.some(locale => pathname === `/${locale}`)) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/home`;
    return NextResponse.redirect(url);
  }

  // IMPORTANT: do NOT redirect "/"
  // Let next-intl handle "/"

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)']
};
