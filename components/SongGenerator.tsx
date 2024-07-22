'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    const handleSubmit = async (e: React.FormEvent) => {
        if (!isLogged) {
            (document.getElementById('sign-in') as HTMLDialogElement).showModal()
            return
        }
        if (credits <= 0 && free <= 0) {
            alert('You have no credits left, please purchase more credits')
            return
        }
        e.preventDefault()
        if (custom && !instrumental) {
            if (lyrics.length < 200) {
                alert('Lyrics should be at least 200 characters')
                return
            }
            if (style.length <= 0) {
                alert('Music Style should not be empty')
                return
            }
            if (title.length <= 0) {
                alert('Song Title should not be empty')
                return
            }
        }
        if (!custom) {
            if (description.length <= 0) {
                alert('Song description should not be empty!')
                return
            }
        }
        if (custom && instrumental) {
            if (style.length <= 0) {
                alert('Music Style should not be empty')
                return
            }
            if (title.length <= 0) {
                alert('Song Title should not be empty')
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
                if (value.length <= 200) {
                    setStyle(value)
                } else {
                    setStyle(value.substring(0, 200))
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
                alert(data.error)
                return
            }
        } catch (e) {
            console.error('Error:', e)
        } finally {
            // wait for 10s to fetch the generated song
            await new Promise(r => setTimeout(r, 60000))
            setLoading(false)
            router.push('/my-music')
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
            {
                !isLogged && (
                    <p className='text-slate-500 text-center mb-6 text-sm'>Login to enjoy <span className='text-secondary text-base font-semibold'>3</span> free credits</p>
                )
            }
            {
                isLogged && free <= 0 && (
                    <p className='text-slate-500 text-center mb-6 text-sm'>You have <span className='text-secondary text-base font-semibold'>{credits}</span> credits</p>
                )
            }
            {
                isLogged && free > 0 && (
                    <p className='text-slate-500 text-center mb-6 text-sm'>You have <span className='text-secondary text-base font-semibold'>{free}</span> free credits</p>
                )
            }
            <div className="max-w-2xl bg-base-200 mx-auto p-6 rounded-lg shadow-md mb-16">
                <div className='flex justify-between mb-4'>
                    <div className='flex gap-x-4'>
                        <div className='flex items-center gap-x-2'>
                            <span className="label-text">Custom</span>
                            <input type="checkbox" checked={custom} className="toggle toggle-secondary" onChange={(e) => { handleCustom(e) }} />
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <span className="label-text">Instrumental
                                <div className="tooltip" data-tip="Music without lyrics">
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
                                    Lyrics
                                    <div className="tooltip" data-tip="Use two verses (8 lines) for best results.">
                                        <i className="ml-2 bi bi-patch-question text-base" />
                                    </div>
                                </label>
                                <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                    <textarea
                                        rows={5}
                                        name="lyrics"
                                        value={lyrics}
                                        onChange={(e) => handleTextChange(e, 'lyrics')}
                                        placeholder="Enter the lyrics here and hit generate song"
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
                                    >
                                        Random Lyrics
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
                                    Music Style
                                    <div className="tooltip" data-tip="Describe the style of music you want (e.g.acoustic pop'). The models do not recognize artists' names but do understand genres and vibes.">
                                        <i className="ml-2 bi bi-patch-question text-base" />
                                    </div>
                                </label>
                                <div className="overflow-hidden bg-base-100 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-slate-600 p-5">
                                    <textarea
                                        rows={2}
                                        name="music style"
                                        value={style}
                                        onChange={(e) => handleTextChange(e, 'style')}
                                        placeholder="Rock, Pop, Jazz"
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
                                        <span className="text-sm ml-2 text-gray-500">{style.length}/200 &nbsp;</span>
                                    </div>
                                </div>
                            </div>
                            <div className='relative mt-8'>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Song Title
                                    <div className="tooltip" data-tip="Give song a title for sharing">
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
                                        placeholder="Enter the song title"
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
                                Song Description
                                <div className="tooltip" data-tip="Describe the style of music and topic you want(e.g. 'acoustic pop about the holidays'). Use genres and vibes instead of specific artists and songs.">
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
                                    placeholder="A futuristic pop song about love"
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

                {
                    loading
                        ?
                        (<div className='w-full text-center mt-4'>
                            <span className="loading loading-dots loading-lg text-primary" />
                            <p className='text-slate-400'>
                                Please wait while we generate your song, this may take a few minutes. Or you can check back later in your <span className="text-slate-500 hover:cursor-pointer underline">Music library</span> page.
                            </p>
                        </div>)
                        :
                        (<button type="submit" onClick={handleSubmit} className="w-full btn btn-primary mt-8">
                            Generate Song
                        </button>)
                }

            </div>
        </div>
    )
}

export default SongGenerator