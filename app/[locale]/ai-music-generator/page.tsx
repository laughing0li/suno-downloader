'use client'
import { Container } from '@/components/Container'
import SongGenerator from '@/components/SongGenerator'
import React from 'react'
import MusicGeneratorUsage from '@/components/usage/MusicGeneratorUsage'
import MusicGeneratorHt from '@/components/howTos/MusicGeneratorHt'
import MusicGeneratorFaq from '@/components/faq/MusicGeneratorFaq'
import MusicGeneratorCta from '@/components/cta/MusicGeneratorCta'
import MusicGeneratorSection from '@/components/features/MusicGeneratorSection'
import { useTranslations } from 'next-intl'
export const runtime = 'edge'
const SunoMusicGenerator = () => {
    const t = useTranslations('ai-music-generator')
    return (
        <Container>
            <div>
                <p className='text-center text-xl font-semibold text-slate-600 my-10'>
                    We apologize for any inconvenience, but the service is currently undergoing an upgrade to improve your experience. We kindly ask you to check back later. We appreciate your patience and understanding.
                </p>
                <h1 className="text-3xl font-bold mb-6 text-center mt-16">{t('title')}</h1>
                <p className='text-center text-secondary text-xs mb-10'>
                    {t('violence-alert')}
                </p>
            </div>
            <SongGenerator />
            <MusicGeneratorUsage />
            <MusicGeneratorSection />
            <MusicGeneratorHt />
            <MusicGeneratorFaq />
            <MusicGeneratorCta />
        </Container>
    )
}

export default SunoMusicGenerator
