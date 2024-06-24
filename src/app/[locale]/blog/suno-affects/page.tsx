import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import React from 'react'
export const runtime = 'edge';

const SunoAffects = () => {
    const t = useTranslations('blog')
    return (
        <Container className='py-20 text-gray-900'>
            <h3 className='font-bold text-2xl my-6 flex justify-center'>
                {t('blog6.title')}
            </h3>
            <div className="mx-auto max-w-4xl px-6 ">
                <p>
                    {t('blog6.p1')}
                </p>
                <ul className='list-disc ml-4 my-5'>
                    <li className='mt-2'>
                        {t('blog6.li1')}
                    </li>
                    <li className='mt-2'>
                        {t('blog6.li2')}
                    </li>
                    <li className='mt-2'>
                        {t('blog6.li3')}
                    </li>
                    <li className='mt-2'>
                        {t('blog6.li4')}
                    </li>
                    <li className='mt-2'>
                        {t('blog6.li5')}
                    </li>
                </ul>
                <p>
                    {t('blog6.p2')}
                </p>
            </div>
        </Container>
    )
}
export default SunoAffects
