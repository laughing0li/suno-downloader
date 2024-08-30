'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import MusicGeneratorSection from './features/MusicGeneratorSection'
import MusicGeneratorFaq from './faq/MusicGeneratorFaq'
import MusicGeneratorHt from './howTos/MusicGeneratorHt'

const SongGenerator = () => {
    const router = useRouter()
    const [lyrics, setLyrics] = useState('')
    const [style, setStyle] = useState('')
    const [title, setTitle] = useState('')
    // description and lyrics are the same, they are used to differentiate between the custom and non-custom mode
    const [description, setDescription] = useState('')
    const [custom, setCustom] = useState(true)
    const [instrumental, setInstrumental] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [credits, setCredits] = useState(0)
    const [free, setFree] = useState(0)
    const t = useTranslations('ai-music-generator')
    const handleSubmit = async (e: React.FormEvent) => {
        if (!isLogged) {
            (document.getElementById('sign-in') as HTMLDialogElement).showModal()
            return
        }
        if (credits <= 0 && free <= 0) {
            alert(t('credits-alert'))
            return
        }
        e.preventDefault()
        if (custom && !instrumental) {
            if (lyrics.length < 200) {
                alert(t('lyrics-length-alert'))
                return
            }
            if (style.length <= 0) {
                alert(t('style-length-alert'))
                return
            }
            if (title.length <= 0) {
                alert(t('title-length-alert'))
                return
            }
        }
        if (!custom) {
            if (description.length <= 0) {
                alert(t('custom-description-alert'))
                return
            }
        }
        if (custom && instrumental) {
            if (style.length <= 0) {
                alert(t('custom-instrumental-style-length-alert'))
                return
            }
            if (title.length <= 0) {
                alert(t('custom-instrumental-title-length-alert'))
                return
            }
        }
        await generate()
    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch('/api/checkLogin')
                const data = await response.json()
                setIsLogged(data.isLoggedIn)
                if (data.isLoggedIn) {
                    setCredits(data.data.credits)
                    setFree(data.data.free)
                }
            } catch (error) {
                console.error(error)
            }
        }
        checkLogin()
    }, [])
    const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustom(e.target.checked)
    }
    const handleInstrumental = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstrumental(e.target.checked)
    }

    const handleTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>, area: string) => {
        const { value } = e.target
        switch (area) {
            case 'lyrics':
                if (value.length <= 3000) {
                    setLyrics(value)
                } else {
                    setLyrics(value.substring(0, 3000))
                }
                break
            case 'style':
                if (value.length <= 50) {
                    setStyle(value)
                } else {
                    setStyle(value.substring(0, 50))
                }
                break
            case 'title':
                if (value.length <= 100) {
                    setTitle(value)
                } else {
                    setTitle(value.substring(0, 100))
                }
                break
            case 'description':
                if (value.length <= 100) {
                    setDescription(value)
                } else {
                    setDescription(value.substring(0, 100))
                }
                break
        }
    }
    const generate = async () => {
        setLoading(true)
        const param = {
            customMode: custom,
            instrumental: instrumental,
            // Determines the value of the 'prompt' based on 'custom' and 'instrumental' flags
            prompt: custom ? (instrumental ? '' : lyrics) : description,
            // If custom mode is true, set the prompt to:
            //   - '' if instrumental is true
            //   - lyrics if instrumental is false
            // If custom mode is false, set the prompt to description
            style: custom ? style : '',
            title: custom ? title : '',
        }

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param),
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
                return
            }
            await new Promise(r => setTimeout(r, 60000))
            router.push('/my-music')
        } catch (e) {
            console.error('Error:', e)
        } finally {
            // wait for 10s to fetch the generated song
            setLoading(false)
        }
    }

    const handleClear = () => {
        setLyrics('')
        setStyle('')
        setTitle('')
        setDescription('')
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center mt-16">{t('title')}</h1>
            <p className='text-center text-secondary text-sm mb-10'>
                {t('violence-alert')}
            </p>
            <div className='flex justify-center place-items-center gap-x-3 mb-4'>
                {
                    !isLogged && (
                        <p className='text-slate-500 text-center text-sm'>{t('ask-login1')}<span className='text-secondary text-base font-semibold'> 3</span> {t('ask-login2')}</p>
                    )
                }
                {
                    isLogged && free <= 0 && (
                        <p className='text-slate-500 text-center text-sm'>{t('credits')}: <span className='text-secondary text-base font-semibold'>{credits ? credits : 0}</span></p>
                    )
                }
                {
                    isLogged && free > 0 && (
                        <p className='text-slate-500 text-center text-sm'>{t('free-credits')}: <span className='text-secondary text-base font-semibold'>{free}</span></p>
                    )
                }
                <div className="divider divider-horizontal"></div>

                <p className="text-center text-sm font-bold text-secondary">
                    <a href="/ai-lyrics-generator">{t('lyrics')} &gt;&gt;</a>
                </p>
            </div>
            <div className="max-w-2xl bg-base-200 mx-auto p-6 rounded-lg shadow-md mb-16">
                <div className='flex justify-between mb-4'>
                    <div className='flex gap-x-4'>
                        <div className='flex items-center gap-x-2'>
                            <span className="label-text">{t('custom')}</span>
                            <input type="checkbox" checked={custom} className="toggle toggle-secondary" onChange={(e) => { handleCustom(e) }} />
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <span className="label-text">{t('instrumental')}
                                <div className="tooltip" data-tip={t('instrumental-tooltip')}>
                                    <i className="ml-2 bi bi-patch-question text-base" />
                                </div>
                            </span>
                            <input type="checkbox" className="toggle toggle-secondary" checked={instrumental} onChange={(e) => { handleInstrumental(e) }} />
                        </div>
                    </div>
                    <button onClick={handleClear} className="btn btn-secondary btn-sm">clear</button>
                </div>
                {
                    custom && (
                        <div>
                            {!instrumental && (<div className='relative'>
                                <label htmlFor="lyrics" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('lyrics-label')}
                                    <div className="tooltip" data-tip={t('lyrics-tooltip')}>
                                        <i className="ml-2 bi bi-patch-question text-base" />
                                    </div>
                                </label>
                                <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                    <textarea
                                        rows={5}
                                        name="lyrics"
                                        value={lyrics}
                                        onChange={(e) => handleTextChange(e, 'lyrics')}
                                        placeholder={t('lyrics-placeholder')}
                                        className='textarea w-full rounded-2xl focus:outline-none focus:ring-0 focus:border-0 placeholder:text-lg'
                                    />

                                    <div aria-hidden="true">
                                        <div className="py-px">
                                            <div className="h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 flex justify-between items-center py-2 pl-3 pr-2">
                                    <div className="flex items-center space-x-5">
                                        {/* <button
                                            type='button'
                                            className="relative inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ring-0 ring-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-true-white/20 border border-light text-dark shadow-xs hover:ring-gray-100 active:ring-gray-200 disabled:text-light px-4 py-2 rounded-3xl hover:ring"
                                            onClick={handleToLyrics}
                                        >
                                            Lyrics Generator
                                            <span className="sr-only">Random Lyrics</span>
                                        </button> */}

                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="text-sm text-gray-500">{lyrics.length}/3000 &nbsp;</span>
                                    </div>
                                </div>
                            </div>)}
                            <div className='relative mt-8'>
                                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('music-style')}
                                    <div className="tooltip" data-tip={t('music-style-tooltip')}>
                                        <i className="ml-2 bi bi-patch-question text-base" />
                                    </div>
                                </label>
                                <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                    <textarea
                                        rows={2}
                                        name="music style"
                                        value={style}
                                        onChange={(e) => handleTextChange(e, 'style')}
                                        placeholder={t('music-style-placeholder')}
                                        required
                                        className='textarea w-full rounded-2xl focus:outline-none focus:ring-0 focus:border-0 placeholder:text-lg'
                                    />

                                    <div aria-hidden="true">
                                        <div className="py-px">
                                            <div className="h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 flex justify-end items-center py-2 pl-3 pr-2">
                                    <div className="flex-shrink-0">
                                        <span className="text-sm ml-2 text-gray-500">{style.length}/50 &nbsp;</span>
                                    </div>
                                </div>
                            </div>
                            <div className='relative mt-8'>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('song-title')}
                                    <div className="tooltip" data-tip={t('song-title-tooltip')}>
                                        <i className="ml-2 bi bi-patch-question text-base" />
                                    </div>
                                </label>
                                <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                    <textarea
                                        rows={1}
                                        name="song title"
                                        value={title}
                                        onChange={(e) => handleTextChange(e, 'title')}
                                        required
                                        placeholder={t('song-title-placeholder')}
                                        className='textarea w-full rounded-2xl focus:outline-none focus:ring-0 focus:border-0 placeholder:text-lg'
                                    />

                                    <div aria-hidden="true">
                                        <div className="py-px">
                                            <div className="h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                                    <div className="flex-shrink-0">
                                        <span className="text-sm text-gray-500">{title.length}/100 &nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
                {
                    !custom && (
                        <div className='relative mt-8'>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('song-description')}
                                <div className="tooltip" data-tip={t('music-style-tooltip')}>
                                    <i className="ml-2 bi bi-patch-question text-base" />
                                </div>
                            </label>
                            <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                <textarea
                                    rows={1}
                                    name="song description"
                                    value={description}
                                    onChange={(e) => handleTextChange(e, 'description')}
                                    required
                                    placeholder={t('song-description-placeholder')}
                                    className='textarea w-full rounded-2xl focus:outline-none focus:ring-0 focus:border-0 placeholder:text-lg'
                                />

                                <div className="" aria-hidden="true">
                                    <div className="py-px">
                                        <div className="h-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                                <div className="flex-shrink-0">
                                    <span className="text-sm text-gray-500">{description.length}/100 &nbsp;</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                loading
                    ?
                    (<div className='mx-auto max-w-3xl text-center mb-8'>
                        <span className="loading loading-dots loading-lg text-primary" />
                        <p className='text-slate-400'>
                            {t('isloading')}<span className="text-slate-500 hover:cursor-pointer underline">{t('library')}</span>
                        </p>
                    </div>)
                    :
                    (<div className='text-center'>
                        <button type="submit" onClick={handleSubmit} className="btn btn-wide btn-primary mb-8">
                            {t('button')}
                        </button>
                    </div>)
            }
            <MusicGeneratorSection />
            <MusicGeneratorHt />
            <MusicGeneratorFaq />
        </div>
    )
}

export default SongGenerator