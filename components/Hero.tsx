'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
// import AdSense from './Adsense'
import { Container } from './Container'
import { BackgroundImage } from './BackgroundImage'

export function Hero() {
    const t = useTranslations('heroSection')
    const [targetUrl, setTargetUrl] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const [isError, setIsError] = useState(false)

    function isValidURL(str: string) {  
        try {
            const url = new URL(str)
            return url.href !== undefined
        } catch (err) {
            return false
        }
    }

    const handleDownloadAudio = async () => {
        setIsDownloading(true) // Disable the button
        if (!isValidURL(targetUrl)) {
            setIsError(true)
            setIsDownloading(false) // Enable the button
            return
        }
        try {
            const response = await fetch('/api/audio-download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: targetUrl }),
            })
            if (response.ok) {
                const filename = response.headers.get('Content-Disposition')?.split('=')[1] ?? 'audio.mp3' // Add nullish coalescing operator to provide a default value
                const blob = await response.blob()
                const audioUrl = URL.createObjectURL(blob)

                const tempLink = document.createElement('a')
                tempLink.href = audioUrl
                tempLink.download = `${decodeURIComponent(filename)}.mp3` // Set the desired file name for the download
                tempLink.click()

                URL.revokeObjectURL(audioUrl) // Clean up the temporary URL
            } else {
                setIsError(true)
            }
        } catch (error) {
            alert('Failed to download audio file')
        }
        setTargetUrl('') // Clear the input field
        setIsDownloading(false) // Enable the button
    }

    const handleClearError = () => {
        setIsError(false)
    }

    return (
        <div className="relative sm:pt-24 pt-12">
            <BackgroundImage position="right" className="-bottom-20 -top-30" />
            <Container className="relative">
                <div className="max-w-4xl mx-auto rounded-2xl shadow-md border-2 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="sm:text-3xl text-xl font-bold mb-2 text-slate-600 flex items-center ">
                            <i className="bi bi-music-note-beamed mr-2" /> {t('title')}
                        </h1>
                        <p className="text-lg text-gray-600">{t('subtitle1')}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* AI Music Generator Section */}
                        <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                            <h2 className="sm:text-2xl text-xl font-bold text-purple-700 mb-3">{t('tool')}</h2>
                            <p className="mb-4 text-gray-600">{t('subtitle2')}</p>
                            <a
                                href="/ai-music-generator"
                                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition duration-300"
                            >
                                {t('try')} <i className="bi bi-arrow-right ml-2" />
                            </a>
                        </div>

                        {/* Suno Music Downloader Section */}
                        {isError && (
                            <div role="alert" className="alert alert-error mb-16">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 hover:" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" onClick={handleClearError} /></svg>
                                <span>{t('error')}</span>
                            </div>
                        )}
                        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
                            <h2 className="sm:text-2xl text-xl font-bold text-slate-600 mb-3">{t('h1')}</h2>
                            <div className="space-x-2 grid sm:grid-cols-5 space-y-2">
                                <input
                                    type="url"
                                    name="name"
                                    id="name"
                                    value={targetUrl}
                                    onChange={(e) => setTargetUrl(e.target.value)}
                                    className="basis col-span-4 block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:text-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={t('placeholder')}
                                />
                                {isDownloading ? (
                                    <span className="loading loading-bars col-span-1 text-indigo-600 loading-lg h-12" />
                                ) : (
                                    <button
                                        className='inline-flex col-span-1 items-center text-center px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-2xl hover:bg-purple-700 transition duration-300'
                                        onClick={handleDownloadAudio}
                                        type="button"
                                    >
                                        {t('button')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <h1 className='text-center text-3xl font-semibold text-slate-600'>{t('tool')}</h1>
                <p className="text-center text-xl font-semibold mt-4 text-slate-600 underline">
                    <a href="/ai-music-generator">{t('try')} &gt;&gt;</a>
                </p> */}
                {/* <div className="mx-auto max-w-xl lg:max-w-3xl lg:px-12">
                    {isError && (
                        <div role="alert" className="alert alert-error mb-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 hover:" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" onClick={handleClearError} /></svg>
                            <span>{t('error')}</span>
                        </div>
                    )} */}

                    {/* <div className="mt-12 flex flex-row gap-10 justify-center">
                        <input
                            type="url"
                            name="name"
                            id="name"
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            className="basis block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:text-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={t('placeholder')}
                        />
                        {isDownloading ? (
                            <span className="loading loading-bars text-indigo-600 loading-lg h-12" />
                        ) : (
                            <button
                                className='inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-2xl hover:bg-purple-700 transition duration-300'
                                onClick={handleDownloadAudio}
                                type="button"
                            >
                                {t('button')}
                            </button>
                        )}
                    </div> */}
                    {/* <div className='mt-10'>
            <AdSense slot={"3719858701"} />
          </div> */}
                {/* </div> */}

            </Container>
        </div>
    )
}
