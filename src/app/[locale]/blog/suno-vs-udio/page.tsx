import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import React from 'react'
export const runtime = 'edge';


const SunoVsUdio = () => {
    const t = useTranslations('blog')
    return (
        <Container className='pt-20 text-gray-900'>
            <h3 className='font-bold text-2xl my-6 flex justify-center'>
                {t('blog5.title')}
            </h3>
            <div className="mx-auto max-w-4xl px-6 ">
                <ul className="list-disc ml-4">
                    <li>
                        {t('blog5.li1')}
                    </li>
                    <li>
                        {t('blog5.li2')}
                    </li>
                    <li>
                        {t('blog5.li3')}
                    </li>
                </ul>
            </div>
        </Container>
    )
}
export default SunoVsUdio
