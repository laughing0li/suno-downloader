"use client"
import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import SoundSkeleton from "@/components/skeleton/SoundSkeleton"
import type { AudioGeneration } from "@/libs/mediaType"
import ExtendComponent from "@/components/ExtendComponent"
import { useTranslations } from "next-intl"

export const runtime = "edge"
interface AudioData {
    id: string
    audio_url: string
    image_url: string
    audio_generations: AudioGeneration
}

export default function Music() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({})
    const [playingId, setPlayingId] = useState<string | null>(null)
    const [audioData, setAudioData] = useState<AudioData[]>(null)
    const [isDownloading, setIsDownloading] = useState(false)
    const t = useTranslations('music-detail')
    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/music?id=${id}`, {
                    method: "GET",
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch the audio URL")
                }
                const data = await response.json()
                setIsOwner(data.isOwner)
                setAudioData(data.audioData)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    const fetchAudioUrl = async (id: string) => {
        setIsDownloading(true)
        try {
            const response = await fetch(
                `/api/user/download?id=${id}`
            )
            if (response.status === 401) {
                alert("You must be logged in to download.")
                return null
            }
            if (!response.ok) {
                throw new Error("Failed to fetch the audio URL")
            }
            const audioBlob = await response.blob()
            return audioBlob
        } catch (error) {
            console.error(error)
            return null
        } finally {
            setIsDownloading(false)
        }
    }


    const handleDownload = async (id: string) => {
        try {
            const audioBlob = await fetchAudioUrl(id) // Replace 'your-audio-id' and yourIndex with actual values
            if (audioBlob) {
                const audioUrl = URL.createObjectURL(audioBlob)
                const a = document.createElement("a")
                a.href = audioUrl
                a.download = "audio.mp3"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(audioUrl)
            }
        } catch (error) {
            console.error("Download failed", error)
        }
    }

    const handleAudioEnded = (audioId: string, index: number) => {
        const uniqueId = `${audioId}-${index}`
        if (playingId === uniqueId) {
            setPlayingId(null)
        }
    }

    const handleDelete = async () => {
        setIsLoading(true)
        const generationId = audioData[0].audio_generations.id
        try {
            const response = await fetch(`/api/music?id=${generationId}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error("Failed to delete the music")
            }
            window.location.href = "/my-music"
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#ECF5FF] via-[#d2deee] to-[#ECF5FF]">
            {!audioData ? (
                <SoundSkeleton />
            ) : (
                <div className="mt-12 flex-grow ">
                    <h1 className="text-center text-3xl font-bold p-4">
                        {audioData[0]?.audio_generations.title}
                    </h1>
                    <h2 className="text-center text-xl font-bold mt-4 ">
                        {t('h2')}:{" "}
                        {audioData[0]?.audio_generations.user.full_name}
                        
                    </h2>
                    <p className="text-center text-sm font-bold mt-4 text-secondary">
                        {t('extend-description')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto mt-12 gap-x-16">
                        <ul role="list">
                            {
                                audioData.map((audio, index) => (
                                    <div
                                        key={index}
                                        className="card w-96 sm:w-full mx-auto bg-base-100 shadow-xl mb-5"
                                    >
                                        <div className="flex items-center gap-x-4 p-8">
                                            <img
                                                alt={
                                                    audio?.audio_generations
                                                        .title
                                                }
                                                src={audio?.image_url}
                                                width={200}
                                                height={200}
                                                className="object-cover rounded-3xl"
                                            />
                                            <div className="gap-4 items-center">
                                                <div className="w-full">
                                                    <p className="text-xl font-semibold">
                                                        {audio?.audio_generations.title}
                                                    </p>
                                                    <div className="flex items-center space-x-3 my-4">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={
                                                                    audio
                                                                        ?.audio_generations
                                                                        .user
                                                                        .avatar_url
                                                                }
                                                                alt={
                                                                    audio
                                                                        ?.audio_generations
                                                                        .user
                                                                        .full_name
                                                                }
                                                                width={50}
                                                                height={50}
                                                                className="w-10 h-10 rounded-full"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs font-medium text-slate-500">
                                                                @{" "}
                                                                {
                                                                    audio
                                                                        ?.audio_generations
                                                                        .user
                                                                        .full_name
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs w-full font-medium text-slate-500">
                                                    {t('created-at')}:{" "}
                                                    {audio?.audio_generations.created_at.slice(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="card-body -mt-10">
                                            <div className="divider" />
                                            <div className="flex items-center justify-between gap-x-2">
                                                <audio
                                                    ref={(el) => {
                                                        audioRefs.current[
                                                            audio.id
                                                        ] = el
                                                    }}
                                                    controls
                                                    src={audio.audio_url}
                                                    // className="hidden"
                                                    controlsList="nodownload"
                                                    onEnded={() =>
                                                        handleAudioEnded(
                                                            audio?.id,
                                                            index
                                                        )
                                                    }
                                                />
                                                <div className="tooltip" data-tip={t('extend-tooltip')}>
                                                    {/* TODO: add extend song feature and block unpaid user */}
                                                    <i className="bi bi-patch-plus text-3xl text-secondary hover:cursor-pointer" onClick={() => (document.getElementById('extend-music') as HTMLDialogElement).showModal()} />
                                                </div>
                                                {
                                                    isDownloading ?
                                                        (<span className="loading loading-ring loading-lg"></span>)
                                                        :
                                                        (
                                                            <div className="tooltip" data-tip={t('download-tooltip')}>
                                                                <i
                                                                    className="bi bi-cloud-arrow-down text-4xl text-secondary hover:cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDownload(
                                                                            audio?.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>

                                    </div>

                                ))
                            }
                            {isOwner &&
                                <div className="flex justify-center">
                                    <button className="btn btn-secondary btn-wide btn-outline" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>{t('delete-btn')}</button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">{t('delete-modal-title')}</h3>
                                            <p className="py-4">{t('delete-tooltip')}</p>
                                            <div className="modal-action">
                                                <button className="btn btn-neutral btn-outline" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).close()}>{t('cancel-btn')}</button>
                                                {
                                                    isLoading ?
                                                        (<span className="loading loading-spinner loading-lg"></span>)
                                                        :
                                                        (<button className="btn btn-error btn-outline" onClick={handleDelete}>{t('delete-btn')}</button>)
                                                }
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            }
                        </ul>

                        <div className="px-10 sm:px-4">
                            <p className="text-2xl font-semibold text-secondary">
                                {t('lyrics')}
                            </p>
                            <pre
                                className="whitespace-pre-line mt-4"
                                style={{ fontFamily: "sans-serif" }}
                            >{audioData[0].audio_generations.prompt}</pre>
                            <p className="text-2xl font-semibold text-secondary mt-10">
                                {t('music-style')}
                            </p>
                            <p>{audioData[0].audio_generations.tags}</p>
                        </div>
                    </div>
                </div>
            )
            }
            <dialog id='extend-music' className='modal'>
                <ExtendComponent />
            </dialog>
        </div >
    )
}
