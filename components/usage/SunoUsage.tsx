import { useTranslations } from 'next-intl'
import React from 'react'
import Image from 'next/image'

const SunoUsage = () => {
    const t = useTranslations('usage.suno-ai-music')
    return (
        <div>
            <div className="max-w-5xl mx-auto px-8 py-16 lg:py-20">
                {/* Generate your own images section */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Image
                            src='https://media.sunodownloader.io/0ceaf08f-2928-4052-87f1-39905a98509c/image_028f0f9a-2e28-43a0-b735-56a05945840a.jpeg'
                            alt="Suno AI music generator image"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {t('paragraph1.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('paragraph1.description')}
                        </p>
                    </div>
                </div>

                {/* Capture the perfect style section */}
                <div className="flex flex-col md:flex-row-reverse items-center mb-16">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Image
                            src='https://media.sunodownloader.io/0ceaf08f-2928-4052-87f1-39905a98509c/image_02a06557-baa0-4621-ab6f-566b96e412fa.jpeg'
                            alt="Suno AI music generator image"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pr-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {t('paragraph2.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('paragraph2.description')}
                        </p>
                    </div>
                </div>

                {/* Produce content without worries section */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Image
                            src='https://media.sunodownloader.io/a8ec69c0-49a1-4871-a3d0-e43964462c67/image_3ae02dbe-6986-4f8f-b113-1ec1fb532284.jpeg'
                            alt="Suno AI music generator image"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {t('paragraph3.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('paragraph3.description')}
                        </p>
                    </div>
                </div>

                {/* Seamlessly create for any project section */}
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Image
                            src='https://media.sunodownloader.io/a8ec69c0-49a1-4871-a3d0-e43964462c67/image_03af514b-99c4-40a5-9a09-4569f7dfb683.jpeg'
                            alt="Suno AI music generator image"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pr-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {t('paragraph4.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('paragraph4.description')}
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <a className="btn btn-secondary btn-outline" href='/suno-ai-music'>
                        {t('btn')}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SunoUsage
