import React from 'react'
import {
    BoltIcon,
    ChatBubbleBottomCenterIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'


const SunoFeatures = () => {
    const t = useTranslations('features.suno-ai-music')
    const features = [
        {
            name: t('feature1.title'),
            description: t('feature1.description'),
            icon: BoltIcon,
        },
        {
            name: t('feature2.title'),
            description: t('feature2.description'),
            icon: ChatBubbleBottomCenterIcon,
        },
        {
            name: t('feature3.title'),
            description: t('feature3.description'),
            icon: AdjustmentsHorizontalIcon,
        },
        {
            name: t('feature4.title'),
            description: t('feature4.description'),
            icon: CurrencyDollarIcon,
        },
        {
            name: t('feature5.title'),
            description: t('feature5.description'),
            icon: SparklesIcon,
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
                                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
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

export default SunoFeatures
