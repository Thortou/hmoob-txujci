import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect /en to /en/home and /la to /la/home
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/home`;
      return NextResponse.redirect(url);
    }
  }

  // Also redirect root / to /home (which will be /en/home with as-needed)
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, `/_vercel` or `/admin`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)']
};
