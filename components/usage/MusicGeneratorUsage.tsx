import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const MusicGeneratorUsage = () => {
    const t = useTranslations('usage.ai-music-generator')
    return (
        <div>
            <div className="max-w-5xl mx-auto px-8 py-16 lg:py-20">
                {/* Generate your own images section */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Image
                            src='https://media.sunodownloader.io/d3385837-a8aa-477b-869e-0d4a42ea8cbd/image_58e166af-dd82-41a8-8a00-2444cba165ab.jpeg'
                            alt="AI music generator image"
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
                            src='https://media.sunodownloader.io/97017c51-6c65-4f62-b49d-df972f19086d/image_2262e5d6-7740-416e-af25-3e3b02e5810b.jpeg'
                            alt="AI music generator image"
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
                            src='https://media.sunodownloader.io/0ceaf08f-2928-4052-87f1-39905a98509c/image_1e4bebc6-a3e3-4f94-aafc-01b4666c46de.jpeg'
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
                            src='https://media.sunodownloader.io/a8ec69c0-49a1-4871-a3d0-e43964462c67/image_6b8e5d67-403c-4f42-8194-b811850e381c.jpeg'
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
                    <a className="btn btn-secondary btn-outline" href='/ai-music-generator'>
                        {t('btn')}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MusicGeneratorUsage
