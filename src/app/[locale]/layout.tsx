import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'
import { Layout } from '@/components/Layout'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode } from 'react'
import Analytics from '@/components/Analytics'
import { cookies } from "next/headers"
import Banner from '@/components/Banner'
export const runtime = 'edge'

type Props = {
    children: ReactNode
    params: { locale: string }
}

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
    variable: '--font-dm-sans',
})
export async function generateMetadata({
    params: { locale }
}: Omit<Props, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'metadata' })
    const cookieStore = cookies();
    const pathName = cookieStore.get('x-pathname')?.value || '/';
    const baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://www.sunodownloader.io';
    const locales = ['ar', 'ch', 'es', 'fr', 'pt', 'ru', 'ko', 'jp', 'de', 'it', 'hi']
    const localePath = locale === 'en' ? '' : `/${locale}`;
    const formattedPath = pathName === '/' ? '/' : pathName;
    const languages = locales.reduce((acc, locale) => {
        acc[locale as keyof typeof acc] = `${baseUrl}/${locale}${formattedPath === '/' ? '' : formattedPath}`;
        return acc
    }, {} as Record<string, string>)
    languages['x-default'] = `${baseUrl}${pathName}`;
    const site_url = `${baseUrl}${localePath}${formattedPath === '/' ? '/' : formattedPath}`
    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: site_url,
            languages: languages
        },
        twitter: {
            card: '',
            site: site_url,
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            site: site_url,
            type: 'website',
            locale: locale,
            images: [
                {
                    url: `${baseUrl}/images/suno.svg`,
                    alt: 'sunodownloader Logo',
                },
            ],
        },
    }
};

const MainLayout = ({
    children,
    params: { locale },
}: Props) => {
    const messages = useMessages()
    unstable_setRequestLocale(locale)
    return (
        <html
            lang="en"
            className={clsx(
                'h-full bg-white antialiased',
                inter.variable,
                dmSans.variable,
            )}
        >
            <Analytics />
            <body className="flex min-h-full">
                <div className="flex w-full flex-col">
                    <Banner />
                    <NextIntlClientProvider messages={messages}>
                        <Layout>{children}</Layout>
                    </NextIntlClientProvider>
                </div>
            </body>
        </html >
    )
}

export default MainLayout