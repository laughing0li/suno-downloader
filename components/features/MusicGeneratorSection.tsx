import React from 'react'
import { useTranslations } from 'next-intl'


const MusicGeneratorSection = () => {
    const t = useTranslations('features.ai-music-generator')
    const features = [
        {
            name: t('feature1.title'),
            description: t('feature1.description'),
            icon: <i className="bi bi-lightning-charge text-white text-xl" />,
        },
        {
            name: t('feature2.title'),
            description: t('feature2.description'),
            icon: <i className="bi bi-chat-left text-white text-xl" />,
        },
        {
            name: t('feature3.title'),
            description: t('feature3.description'),
            icon: <i className="bi bi-gear text-white text-xl" />,
        },
        {
            name: t('feature4.title'),
            description: t('feature4.description'),
            icon: <i className="bi bi-currency-dollar text-white text-xl" />,
        },
        {
            name: t('feature5.title'),
            description: t('feature5.description'),
            icon: <i className="bi bi-stars text-white text-xl" />,
        }
    ]
    return (
        <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="font-bold leading-7 text-slate-700 sm:text-4xl text-2xl">
                    {t('h2')}
                </h2>
                <p className="mt-2 tracking-tight text-gray-900">
                    {t('description')}
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                    {feature.icon}
                                </div>
                                {feature.name}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default MusicGeneratorSection
