"use client"

import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import type { JSX } from "react"

interface FAQItemProps {
    question: string
    answer: JSX.Element
}
const FaqItem = ({ item }: { item: FAQItemProps }) => {
    const accordion = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <li>
            <button
                className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
                onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(!isOpen)
                }}
                aria-expanded={isOpen}
            >
                <h3
                    className={`flex-1 text-base-content ${isOpen ? "text-slate-600" : ""}`}
                >
                    {item?.question}
                </h3>
                <svg
                    className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${isOpen && "rotate-180"
                            }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${isOpen && "rotate-180 hidden"
                            }`}
                    />
                </svg>
            </button>

            <div
                ref={accordion}
                className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                style={
                    isOpen
                        ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
                        : { maxHeight: 0, opacity: 0 }
                }
            >
                <div className="pb-5 leading-relaxed">{item?.answer}</div>
            </div>
        </li>
    )
}
const SunoHowTo = () => {
    const t = useTranslations('howTo.suno-ai-music')

    // FAQ items with translations
    const faqList: FAQItemProps[] = [
        {
            question: t('step1.title'),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t('step1.description')}
                </div>
            ),
        },
        {
            question: t('step2.title'),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t('step2.description')}
                </div>
            ),
        },
        {
            question: t('step3.title'),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t('step3.description')}
                </div>
            ),
        },
        {
            question: t('step4.title'),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t('step4.description')}
                </div>
            ),
        },
        {
            question: t('step5.title'),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t('step5.description')}
                </div>
            ),
        },
        {
            question: t('step6.title'),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t('step6.description')}
                </div>
            ),
        }
    ]

    return (
        <section id="faq">
            <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col text-left basis-1/2">
                    <h2 className="sm:text-3xl text-xl font-extrabold text-slate-700">
                        {t('h2')}
                    </h2>
                </div>
                <div className="basis-1/2">
                    <ul >
                        {faqList.map((item, i) => (
                            <FaqItem key={i} item={item} />
                        ))}
                    </ul>
                    <a className="btn btn-secondary btn-outline mt-4" href="/suno-ai-music">
                        {t('btn')}
                    </a>
                </div>
            </div>
        </section>
    )
}


export default SunoHowTo
