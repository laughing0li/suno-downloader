'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"

const ExtendComponent = () => {
    const router = useRouter()
    const [lyrics, setLyrics] = useState('')
    const [style, setStyle] = useState('')
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [credits, setCredits] = useState(0)
    const [extendFrom, setExtendFrom] = useState('')
    const [hasAccess, setHasAccess] = useState(false)
    const t = useTranslations('ai-music-generator')
    const { id } = useParams()
    const handleSubmit = async (e: React.FormEvent) => {
        if (!hasAccess) {
            toast.error(t('upgrade-alert'))
            return
        }
        
        if (credits <= 0) {
            toast.error(t('credits-alert'))
            // wait for 2s to redirect to pricing page
            setTimeout(() => {
                router.push('/pricing')
            }, 2000)
            return
        }
        e.preventDefault()
        if (lyrics.length < 200) {
            toast.error(t('lyrics-length-alert'))
            return
        }
        if (style.length <= 0) {
            toast.error(t('style-length-alert'))
            return
        }
        if (title.length <= 0) {
            toast.error(t('title-length-alert'))
            return
        }
        await generate()
    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch('/api/checkLogin')
                const data = await response.json()
                if (data.isLoggedIn) {
                    setCredits(data.data.credits)
                    setHasAccess(data.data.has_access)
                }
            } catch (error) {
                console.error(error)
            }
        }
        checkLogin()
    }, [])
    console.log('has_access: ', hasAccess)
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
        }
    }

    const validateExtendFrom = (time: string) => {
        const timeRegex = /^(\d+):([0-5]\d)$/
        const match = time.match(timeRegex)
        if (!match) {
            toast.error('Invalid time format. Please use m:ss format.')
            return
        }
        const minutes = parseInt(match[1])
        const seconds = parseInt(match[2])
        const totalSeconds = minutes * 60 + seconds
        return totalSeconds
    }
    const generate = async () => {
        const continueAt = validateExtendFrom(extendFrom)
        if (!continueAt) {
            return
        }
        setLoading(true)
        const param = {
            audioId: id,
            style: style,
            title: title,
            prompt: lyrics,
            continueAt: continueAt,
        }
        try {
            const res = await fetch('/api/generate/extend', {
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
            // 2 minutes
            await new Promise(r => setTimeout(r, 150000))
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
    }
    return (
        <div>
            <div className="w-full mx-auto p-4 rounded-lg shadow-md mb-8 bg-base-200 sm:w-11/12 md:w-10/12 lg:max-w-2xl lg:p-6 sm:h-[800px] h-[400px] mt-48 overflow-y-auto">
                <div>
                    <p className='text-center text-secondary text-sm mb-10'>
                        {t('violence-alert')}
                    </p>
                </div>
                <div className='flex justify-center place-items-center gap-x-3 mb-4'>
                    <p className='text-slate-500 text-center text-sm'>{t('credits')}: <span className='text-secondary text-base font-semibold'>{credits ? credits : 0}</span></p>
                </div>
                <div className='flex justify-between mb-4'>
                    <div>
                    </div>
                    <button onClick={handleClear} className="btn btn-secondary btn-sm">clear</button>
                </div>
                <div>
                    <div className='relative'>
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
                            </div>
                            <div className="flex-shrink-0">
                                <span className="text-sm text-gray-500">{lyrics.length}/3000 &nbsp;</span>
                            </div>
                        </div>
                    </div>
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
                    <div className='relative mt-8'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('extend-from-label')} <span className='text-xs text-secondary'> m:ss</span>
                            <div className="tooltip" data-tip={t('extend-from-tooltip')}>
                                <i className="ml-2 bi bi-patch-question text-base" />
                            </div>
                        </label>
                        <div className="">
                            <input type="text" placeholder="3:22, 0:33, 1:00" value={extendFrom} onChange={(e) => setExtendFrom(e.target.value)} className="input input-bordered max-w-xs" />
                            <div aria-hidden="true">
                                <div className="py-px">
                                    <div className="h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading
                        ?
                        (<div className='mx-auto max-w-3xl text-center sm:my-8'>
                            <span className="loading loading-dots loading-lg text-primary" />
                            <p className='text-slate-400'>
                                {t('extend-loading')}
                            </p>
                        </div>)
                        :
                        (<div className='text-center sm:my-8 mb-24 gap-x-4 flex justify-center'>
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary mb-8">
                                {t('extend-song-btn')}
                            </button>
                            <button onClick={() => (document.getElementById('extend-music') as HTMLDialogElement).close()} className="btn btn-neutral mb-8">{t('cancel-btn')}</button>
                        </div>)
                }

            </div>
        </div>
    )
}

export default ExtendComponent