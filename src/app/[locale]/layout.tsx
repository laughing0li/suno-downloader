import { type Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'
import { Layout } from '@/components/Layout'
import { unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  params: { locale: string };
};

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

export const metadata: Metadata = {
  title: {
    template: '%s - Suno Downloader',
    default: 'Suno Downloader - Free & Fast Suno Music Downloader',
  },
  description:
    'Experience the future of music with Suno AI. Download AI-generated songs instantly. Explore a wide range of genres and start your musical journey today!',
}
const MainLayout = ({
  children,
  params: { locale },
}: Props) => {
  const messages = useMessages();
  unstable_setRequestLocale(locale);
  return (
    <html
      lang="en"
      className={clsx(
        'h-full bg-white antialiased',
        inter.variable,
        dmSans.variable,
      )}
    >
      {/* <Analytics /> */}
      <body className="flex min-h-full">
        <div className="flex w-full flex-col">
          <NextIntlClientProvider messages={messages}>
            <Layout>{children}</Layout>
          </NextIntlClientProvider>
        </div>
      </body>
    </html >
  )
}

export default MainLayout