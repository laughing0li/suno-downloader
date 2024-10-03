'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '@/components/Container'
export const runtime = 'edge';
const AiLyricsGenerator = () => {
    const [lyrics, setLyrics] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [credits, setCredits] = useState(0)
    const [copied, setCopied] = useState(false)

    const generateLyrics = async () => {
        if (!isLogged) {
            (document.getElementById('sign-in') as HTMLDialogElement).showModal()
            return
        }
        if (credits <= 0) {
            alert('You have no lyrics credits left. Please buy credits to continue')
            return
        }
        setLoading(true)
        if (description.length === 0) {
            alert('Please enter a description')
            setLoading(false)
            return
        }
        setLyrics('')
        try {
            const response = await fetch('/api/generate/lyrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            })
            const data = await response.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setLyrics(data.lyrics)
        } catch (error) {
            console.error('Error generating lyrics:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch('/api/checkLogin')
                const data = await response.json()
                setIsLogged(data.isLoggedIn)
                if (data.isLoggedIn) {
                    setCredits(data.data.lyric_credits)
                }
            } catch (error) {
                console.error(error)
            }
        }
        checkLogin()
    }, [])

    const handleTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        if (value.length <= 200) {
            setDescription(value)
        } else {
            setDescription(value.substring(0, 200))
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(lyrics)
            .then(() => {
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 2000)
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err)
            })
    }

    const handleClear = () => {
        setLyrics('')
        setDescription('')
    }
    return (
        <Container>
            <div className='mb-4'>
                <h1 className="text-3xl font-bold mb-6 text-center mt-16">
                    AI Lyrics Generator
                </h1>
            </div>
            <div className='flex justify-center place-items-center gap-x-3 mb-4'>
                {
                    !isLogged && (
                        <p className='text-slate-500 text-center text-sm'>Login to enjoy free credits</p>
                    )
                }
                {
                    isLogged && credits >= 0 && (
                        <p className='text-slate-500 text-center text-sm'>You have <span className='text-secondary text-base font-semibold'>{credits ? credits : 0}</span> credits</p>
                    )
                }
                <div className="divider divider-horizontal"></div>

                <p className="text-center text-sm font-bold text-secondary">
                    <a href="/ai-music-generator">AI Music Generator &gt;&gt;</a>
                </p>
            </div>

            <div className="max-w-2xl bg-base-200 mx-auto p-6 rounded-lg shadow-md mb-16">
                <div className='flex justify-between mb-4'>
                    <div className='flex gap-x-4'>
                        <div className='flex items-center gap-x-2'>
                            {/* <span className="label-text">Custom</span>
                            <input type="checkbox" checked={custom} className="toggle toggle-secondary" onChange={(e) => { handleCustom(e) }} /> */}
                        </div>
                        <div className='flex items-center gap-x-2'>
                            {/* <span className="label-text">Instrumental
                                <div className="tooltip" data-tip="Music without lyrics">
                                    <i className="ml-2 bi bi-patch-question text-base" />
                                </div>
                            </span>
                            <input type="checkbox" className="toggle toggle-secondary" checked={instrumental} onChange={(e) => { handleInstrumental(e) }} /> */}
                        </div>
                    </div>
                    <button onClick={handleClear} className="btn btn-secondary btn-sm">clear</button>
                </div>
                {
                    <div>
                        <div className='relative'>
                            <label htmlFor="lyrics" className="block text-sm font-medium text-gray-700 mb-1">
                                Song Description
                                <div className="tooltip" data-tip="You can use your own language">
                                    <i className="ml-2 bi bi-patch-question text-base" />
                                </div>
                            </label>
                            <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                <textarea
                                    rows={2}
                                    name="lyrics"
                                    value={description}
                                    onChange={(e) => handleTextChange(e)}
                                    placeholder="Describe your song in 200 characters or less"
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
                                    <span className="text-sm text-gray-500">{description.length}/200 &nbsp;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='text-center mt-10 mb-24'>
                {
                    loading ? (<span className="loading loading-dots w-10 text-secondary"></span>) : (<button className="btn btn-primary" onClick={generateLyrics}>Generate Lyrics</button>)
                }
            </div>
            {
                lyrics && (
                    <pre
                        className="whitespace-pre-line mt-4 text-center mb-10"
                        style={{ fontFamily: "sans-serif" }}
                    >
                        {lyrics}
                        <div className='mt-4'>
                            <button className='btn btn-primary btn-wide' onClick={handleCopy}>{
                                copied ? 'Copied!' : 'Copy Lyrics'
                            }
                            </button>
                        </div>
                    </pre>
                )
            }
        </Container>
    )
}

export default AiLyricsGenerator