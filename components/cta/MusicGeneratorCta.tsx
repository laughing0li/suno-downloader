import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const MusicGeneratorCta = () => {
    const t = useTranslations('cta.ai-music-generator')
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl mb-4 text-slate-700">
                    {t('h2')}
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-8">
                    {t('description')}
                </p>
                <div className="flex justify-center space-x-4">
                    <Link href={'/ai-music-generator'} className="btn btn-secondary btn-wide btn-outline">
                        {t('btn')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MusicGeneratorCta
