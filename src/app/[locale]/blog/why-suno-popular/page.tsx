import { Container } from '@/components/Container';
import { useTranslations } from 'next-intl'
import React from 'react'
export const runtime = 'edge';

const SunoPopular = () => {
    const t = useTranslations('blog')

    return (
        <Container className='py-20 text-gray-900'>
            <h3 className='font-bold text-2xl my-6 flex justify-center'>
                {t('blog4.title')}
            </h3>
            <div className="mx-auto max-w-4xl px-6 ">
                <p>
                    {t('blog4.p1')}
                </p>
                <ul className='list-disc my-5'>
                    <li className='mt-2'>
                        {t('blog4.li1')}
                    </li>
                    <li className='mt-2'>
                        {t('blog4.li2')}
                    </li>
                    <li className='mt-2'>
                        {t('blog4.li3')}
                    </li>
                    <li className='mt-2'>
                        {t('blog4.li4')}
                    </li>
                    <li className='mt-2'>
                        {t('blog4.li5')}
                    </li>
                    <li className='mt-2'>
                        {t('blog4.li6')}
                    </li>
                </ul>
                <p>
                    {t('blog4.p2')}
                </p>
            </div>
        </Container>
    )
}

export default SunoPopular
