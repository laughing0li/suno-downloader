import { useTranslations } from 'next-intl'
import Image from 'next/image'
export function Instruction() {
    const t = useTranslations('instruction')
    return (
        <div>
            <h2 className='text-2xl font-bold leading-10 tracking-tight pb-4 text-gray-900'>{t('h2')}</h2>
            <Image width={400} height={200} alt="" className="float-left mr-10" src="https://raw.githubusercontent.com/laughing0li/FIgureBed/master/suno-downloader/example.png" />
            <p className='text-gray-600 text-medium pb-2'>
                {t('p1')}
            </p>
            <ul className='list-disc'>
                <li className='text-gray-600'>https://app.suno.ai/song/b27c29f6-8ab4-47eb-81fd-efb85c848ada</li>
                <li className='text-gray-600'>https://app.suno.ai/song/ad5a966b-dea1-4cbc-aeee-d5e9541157b9</li>
            </ul>
            <p className='text-gray-600 text-medium'>
                {t('p2')}
            </p>
        </div>
    )
}
