'use client'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Container } from './Container'
import { Instruction } from './Instruction'
import { useTranslations } from 'next-intl'

export default function Faq() {
    const t = useTranslations('faq')
    const faqs = [
        {
            question: t('question1'),
            answer: t('answer1'),
        },
        {
            question: t('question2'),
            answer: t('answer2'),
        },
        {
            question: t('question3'),
            answer: t('answer3'),
        },
        {
            question: t('question4'),
            answer: t('answer4'),
        }
    ]
    return (
        <Container className='pt-36'>
            <div className="mx-auto max-w-4xl px-6 ">
                <p className="mx-auto text-lg leading-8 text-gray-600">
                    {t('p1')}
                </p>
                <p className="mx-auto text-lg pb-16 leading-8 text-gray-600">
                    {t('p2')}
                </p>
                <Instruction />

                <div className="mt-24 mx-auto pb-10 max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">{t('h2')}</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </Container>
    )
}
