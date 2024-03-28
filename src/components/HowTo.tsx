import { useTranslations } from "next-intl"

const HowTo = () => {
    const t = useTranslations('howTo')
    return (
        <div>
            <div className="mt-16">
                <h2 className="text-2xl font-bold leading-10 tracking-tight pb-4 text-gray-900">{t('question1')}</h2>
                <p className="text-gray-600">{t('answer1')}</p>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-1 mt-10 gap-10">
                <div>
                    <h3 className="font-bold text-gray-900 pb-2">{t('question2')}</h3>
                    <p className="text-sm text-gray-600">{t('answer2')}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 pb-2">{t('question3')}</h3>
                    <p className="text-sm text-gray-600">{t('answer3')}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 pb-2">{t('question4')}</h3>
                    <p className="text-sm text-gray-600">{t('answer4')}</p>
                </div>
            </div>
        </div>
    )
}

export default HowTo
