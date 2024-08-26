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
const MusicGeneratorFaq = () => {
    const t = useTranslations('faq.music-generator')

    // FAQ items with translations
    const faqList: FAQItemProps[] = [
        {
            question: t("q1.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q1.answer")}
                </div>
            ),
        },
        {
            question: t("q2.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q2.answer")}
                </div>
            ),
        },
        {
            question: t("q3.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q3.answer")}
                </div>
            ),
        },
        {
            question: t("q4.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q4.answer")}
                </div>
            ),
        },
        {
            question: t("q5.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q5.answer")}
                </div>
            ),
        },
        {
            question: t("q6.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q6.answer")}
                </div>
            ),
        },
        {
            question: t("q7.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q7.answer")}
                </div>
            ),
        },
        {
            question: t("q8.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q8.answer")}
                </div>
            ),
        },
        {
            question: t("q9.question"),
            answer: (
                <div className="space-y-2 leading-relaxed">
                    {t("q9.answer")}
                </div>
            ),
        }
    ]

    return (
        <section id="faq">
            <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col text-left basis-1/2">
                    <p className="inline-block font-semibold text-slate-600 mb-4">FAQ</p>
                    <h2 className="sm:text-3xl text-xl font-extrabold text-slate-700">
                        {t('h2')}
                    </h2>
                </div>

                <ul className="basis-1/2">
                    {faqList.map((item, i) => (
                        <FaqItem key={i} item={item} />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default MusicGeneratorFaq
