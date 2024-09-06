'use client'
import { Container } from '@/components/Container'
import React from 'react'
import SunoUsage from '@/components/usage/SunoUsage'
import SunoHowTo from '@/components/howTos/SunoHowTo'
import SunoFeatures from '@/components/features/SunoFeatures'
import SunoFaq from '@/components/faq/SunoFaq'
import SunoCta from '@/components/cta/SunoCta'
import SongGenerator from '@/components/SongGenerator'
import { useTranslations } from 'next-intl'
export const runtime = 'edge'

const SunoAIMusic = () => {
    const t = useTranslations('suno-ai-music')
    const h = useTranslations('ai-music-generator')
    return (
        <Container>
            <div>
                <h1 className="text-3xl font-bold mb-6 text-center mt-16">{t('title')}</h1>
                <p className='text-center text-secondary text-sm mb-10'>
                    {h('violence-alert')}
                </p>
            </div>
            <SongGenerator />
            <SunoUsage />
            <SunoFeatures />
            <SunoHowTo />
            <SunoFaq />
            <SunoCta />
        </Container>
    )
}

export default SunoAIMusic
