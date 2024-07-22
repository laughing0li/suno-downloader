import { Container } from "@/components/Container"
import { useTranslations } from "next-intl"
export const runtime = 'edge';

export default function About() {
    const t = useTranslations('about')
    return (
        <Container>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('h1')}</h1>
                        <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
                            <div>
                                <p>
                                    {t('p1')} <a className="text-indigo-600" href="/">{t('a')}</a>, {t('p2')}
                                </p>
                                <p className="mt-8">
                                    {t('p3')}
                                </p>
                            </div>
                            <div>
                                <p>
                                    {t('p4')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
