'use client'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Container } from './Container'
import { Instruction } from './Instruction'

const faqs = [
    {
        question: "Is Suno Music Downloader free to use?",
        answer:
            "Yes, Suno Music Downloader is completely free to use. You can download as many songs as you want without any charges.",
    },
    {
        question: "Does Suno Music Downloader have any limitations?",
        answer:
            "No, the Suno Music Downloader has no limitations. You can download as many songs as you want without any restrictions.",
    },
    {
        question: "Can I download Suno songs on my mobile device?",
        answer:
            "Yes, you can download songs from Suno Music Downloader on any device (iOS or Android)",
    },
    {
        question: "Where can I find the downloaded songs?",
        answer:
            "Whether you use pc or mobile device, The downloaded songs can be found in your device's default download directory",
    }
]

export default function Faq() {
    return (
        <Container className='pt-36'>
            <div className="mx-auto max-w-4xl px-6 ">
                <p className="mx-auto text-lg leading-8 text-gray-600">
                    The Suno Music Downloader lets you seamlessly explore and save AI-generated music tracks directly to your device (be it mobile or PC) at no cost. Immerse yourself in the innovative world of Suno AI.
                </p>
                <p className="mx-auto text-lg pb-16 leading-8 text-gray-600">
                    Feel free to download as many Suno tracks as you desire. Our Suno Music Saver imposes no restrictions on the number of songs you can save, ensuring an unrestricted musical adventure. What sets our tool apart is its remarkable efficiency: depending on your internet speed, fetching download links takes mere seconds.
                </p>
                <Instruction />

                <div className="mt-24 mx-auto pb-10 max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions - FAQ</h2>
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
