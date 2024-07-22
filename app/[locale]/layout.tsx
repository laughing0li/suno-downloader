import { ReactNode } from "react"
import { Inter } from "next/font/google"
import { Viewport } from "next"
import ClientLayout from "@/components/LayoutClient"
import config from "@/config"
import "./globals.css"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { cookies } from "next/headers"
import 'bootstrap-icons/font/bootstrap-icons.css'
import Analytics from "@/components/Analytics"

const font = Inter({ subsets: ["latin"] })
type Props = {
    children: ReactNode
    params: { locale: string }
}
export const viewport: Viewport = {
    // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
    themeColor: config.colors.main,
    width: "device-width",
    initialScale: 1,
}
export async function generateMetadata({
    params: { locale }
}: Omit<Props, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'metadata' })
    const cookieStore = cookies();
    let pathName = cookieStore.get('x-pathname')?.value || '/';
    const baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://www.sunodownloader.io';
    const locales = ['ar', 'ch', 'es', 'fr', 'pt', 'ru', 'ko', 'jp', 'de', 'it', 'hi']
    const localePath = locale === 'en' ? '' : `/${locale}`;
    // Ensure correct formatting
    if (pathName !== '/' && pathName.endsWith('/')) {
        pathName = pathName.slice(0, -1); // Remove trailing slash from non-root paths
    }
    const site_url = localePath === '' && pathName === '/' ? `${baseUrl}/` : `${baseUrl}${localePath}${pathName === '/' ? '' : pathName}`;
    const languages = locales.reduce((acc, locale) => {
        acc[locale as keyof typeof acc] = `${baseUrl}/${locale}${pathName === '/' ? '' : pathName}`;
        return acc
    }, {} as Record<string, string>)
    languages['x-default'] = `${baseUrl}${pathName}`;
    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: site_url,
            languages: languages
        },
        // twitter: {
        //     card: '',
        //     site: site_url,
        // },
        // openGraph: {
        //     title: t('title'),
        //     description: t('description'),
        //     site: site_url,
        //     type: 'website',
        //     locale: locale,
        //     images: [
        //         {
        //             url: `${baseUrl}/images/suno.svg`,
        //             alt: 'sunodownloader Logo',
        //         },
        //     ],
        // },
    }
}

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.

const MainLayout = ({
    children,
    params: { locale },
}: Props) => {
    const messages = useMessages()
    unstable_setRequestLocale(locale)
    return (
        <html lang="en" data-theme={config.colors.theme} className={font.className}>
            <Analytics />
            <body>
                {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
                <NextIntlClientProvider messages={messages}>
                    <ClientLayout>{children}</ClientLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
export default MainLayout;