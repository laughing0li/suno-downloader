import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import LanSwitcher from './LanSwitcher'
import React from 'react'
import { useTranslations } from 'next-intl';
export const runtime = 'edge';

export function Header() {
  const t = useTranslations('heroSection')
  return (
    <header className="relative z-50 flex-none lg:pt-11">
      <Container className="">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0 flex justify-between">
          <a href="/">
            <Logo className="h-12 w-auto text-slate-900" />
          </a>
          <h1 className="grid  font-display text-2xl font-bold text-blue-600 sm:text-4xl -ml-32">
            {t('h1')}
          </h1>
          <LanSwitcher />
        </div>
      </Container>
    </header>
  )
}
