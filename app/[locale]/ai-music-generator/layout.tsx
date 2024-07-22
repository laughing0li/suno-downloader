import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"
import { ReactNode } from "react"
type Props = {
    children: ReactNode
    params: { locale: string }
}
export async function generateMetadata({
    params: { locale }
}: Omit<Props, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'metadata' })
    const cookieStore = cookies()
    let pathName = cookieStore.get('x-pathname')?.value || '/'
    const locales = ['ar', 'ch', 'es', 'fr', 'pt', 'ru', 'ko', 'jp', 'de', 'it', 'hi']
    const localePath = locale === 'en' ? '' : `/${locale}`
    const baseUrl = `https://www.sunodownloader.io${localePath}/ai-music-generator`
    // Ensure correct formatting
    if (pathName !== '/' && pathName.endsWith('/')) {
        pathName = pathName.slice(0, -1) // Remove trailing slash from non-root paths
    }
    const languages = locales.reduce((acc, locale) => {
        acc[locale as keyof typeof acc] = `https://www.sunodownloader.io/${locale}/ai-music-generator`
        return acc
    }, {} as Record<string, string>)
    languages['x-default'] = `https://www.sunodownloader.io/ai-music-generator`
    return {
        title: "Free AI Music Generator",
        description: "Generate AI music for free with AI music generator. Create unlimited music tracks use it anywhere.",
        alternates: {
            canonical: baseUrl,
            languages: languages
        },
    }
}
export default async function LayoutPrivate({
    children,
}: {
    children: ReactNode
}) {


    return <>{children}</>
}
