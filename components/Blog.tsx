import { useTranslations } from 'next-intl'
import React from 'react'
export const runtime = 'edge';

const Blog = () => {
    const t = useTranslations('blog')

    return (
        <div className='text-gray-900'>
            <h3 className='font-bold my-2'>
                {t('blog1.title')}
            </h3>
            <ul className='list-disc ml-4'>
                <li>
                    {t('blog1.p1')}
                </li>
                <li>
                    {t('blog1.p2')}
                </li>
            </ul>
            <h3 className='font-bold my-2'>
                {t('blog2.title')}
            </h3>
            <p>
                {t('blog2.p1')}
            </p>
            <h3 className='font-bold my-2'>
                {t('blog3.title')}
            </h3>
            <p>
                {t('blog3.p1')}
            </p>
            <a href="/blog/why-suno-popular">
                <h3 className='font-bold my-2'>
                    {t('blog4.title')}
                </h3>
            </a>
            <a href="/blog/suno-vs-udio">
                <h3 className='font-bold my-2'>
                    {t('blog5.title')}
                </h3>
            </a>
            <a href="/blog/suno-affects">
                <h3 className='font-bold my-2'>
                    {t('blog6.title')}
                </h3>
            </a>

        </div>
    )
}

export default Blog
