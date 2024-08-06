// import { Pathnames } from 'next-intl/navigation'
import { Pathnames } from 'next-intl/routing'
export const locales = ['en', 'ch', 'jp', 'ko', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ar', 'hi'] as const

export const pathnames = {
    '/': '/'
} satisfies Pathnames<typeof locales>

// use as-needed which will make the en locale as the default locale and it won't be added to the path
export const localePrefix = "as-needed"

export type AppPathnames = keyof typeof pathnames
