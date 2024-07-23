import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import createMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix } from "./i18nConfig";
import { NextRequest, NextResponse } from "next/server";

// The middleware is used to refresh the user's session before loading Server Component routes

const intlMiddleware = createMiddleware({
    defaultLocale: "en",
    locales,
    pathnames,
    localePrefix,
});

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/" && req.nextUrl.searchParams.has("code")) {
        // Redirect to the correct callback URL
        const url = req.nextUrl.clone();
        url.pathname = "/api/auth/callback";
        return NextResponse.redirect(url);
    }
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
    const intlResponse = intlMiddleware(req);
    return intlResponse;

    // const res = NextResponse.next();
    // const supabase = createMiddlewareClient({ req, res });
    // await supabase.auth.getSession();
    // return res;
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        "/",

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        "/(en|ch|jp|ko|es|fr|de|it|pt|ru|ar|hi)/:path*",

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        "/((?!en|_next|_vercel|.*\\..*|api/).*)",
    ],
};
