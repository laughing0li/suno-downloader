// import { Pathnames } from 'next-intl/navigation'
import { Pathnames } from 'next-intl/routing'
export const locales = ['en', 'ch', 'jp', 'ko', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ar', 'hi'] as const

export const pathnames = {
    '/': '/',
    '/pathnames': {
        en: '/',
        ch: '/ch',
        jp: '/jp',
        ko: '/ko',
        es: '/es',
        fr: '/fr',
        de: '/de',
        it: '/it',
        pt: '/pt',
        ru: '/ru',
        ar: '/ar',
        hi: '/hi',
    },
    '/about': {
        en: '/about',
        ch: '/about',
        jp: '/about',
        ko: '/about',
        es: '/about',
        fr: '/about',
        de: '/about',
        it: '/about',
        pt: '/about',
        ru: '/about',
        ar: '/about',
        hi: '/about',
    },
    '/privacy': {
        en: '/privacy',
        ch: '/privacy',
        jp: '/privacy',
        ko: '/privacy',
        es: '/privacy',
        fr: '/privacy',
        de: '/privacy',
        it: '/privacy',
        pt: '/privacy',
        ru: '/privacy',
        ar: '/privacy',
        hi: '/privacy',
    }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = "as-needed"

export type AppPathnames = keyof typeof pathnames
