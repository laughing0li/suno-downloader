import { Container } from "@/components/Container"
import { useTranslations } from "next-intl"

export default function Privacy() {
    const t = useTranslations('privacy')
    return (
        <Container>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('h1')}</h1>
                        <div className="mt-10 grid max-w-xl gap-8 text-base leading-7 text-gray-700 lg:max-w-none">
                            <p>
                                {t('p1')} <a href="/" className="text-indigo-600">{t('a')}</a>, {t('p2')}
                            </p>
                            <ul className="list-decimal">
                                <li className="py-2">
                                    <strong>{t('p-strong1')}</strong> {t('p3')}
                                </li>
                                <li className="py-2">
                                    <strong>{t('p-strong2')}</strong> {t('p4')}
                                </li>
                                {/* <li className="py-2">
                                    <strong>Third-Party Advertisements: </strong> Some advertisements on Suno Music Downloader are managed by third parties, such as ad networks and advertising agencies, who may use cookies and other technologies to collect information about your online activities across websites to tailor advertisements to your interests. It’s important to note that these third parties information practices are not governed by our privacy policy.
                                </li> */}
                                <li className="py-2">
                                    <strong>{t('p-strong3')}</strong> {t('p5')}
                                </li>
                                <li className="py-2">
                                    <strong>{t('p-strong4')} </strong>{t('p6')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
