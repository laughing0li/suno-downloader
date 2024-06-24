import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix } from './config'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames,
  localePrefix,
})

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

  // Add the pathname to the headers
  let pathname = request.nextUrl.pathname
  const localePattern = /^\/(en|ch|jp|ko|es|fr|de|it|pt|ru|ar|hi)(\/|$)/
  pathname = pathname.replace(localePattern, '/')
//   response.headers.set('x-pathname', pathname)
  response.cookies.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|ch|jp|ko|es|fr|de|it|pt|ru|ar|hi)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!en|_next|_vercel|.*\\..*|api/audio).*)',
  ],
}
