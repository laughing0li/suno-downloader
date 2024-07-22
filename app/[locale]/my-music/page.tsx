'use client'
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import PaginationControls from "@/components/PaginationControls"
import type { AudioGeneration } from "@/libs/mediaType"
import MyMusicSkeleton from "@/components/skeleton/MyMusicSkeleton"
export const runtime = 'edge'

interface AudioData {
    id: string
    audio_url: string
    image_url: string
    created_at: string
    audio_generations: AudioGeneration
}

export default function MyMusic() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const pageParam = searchParams.get('page')
    const [totalPages, setTotalPages] = useState(0)
    const [pageSize] = useState(16) // Fixed page size for simplicity
    const [page, setPage] = useState(Number(pageParam) || 1)
    const [audioData, setAudioData] = useState<AudioData[]>([])
    const [isPolling, setIsPolling] = useState(true)
    const intervalIdRef = useRef(null)
    const [credits, setCredits] = useState(0)

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        const newQuery = new URLSearchParams(searchParams.toString())
        newQuery.set('page', newPage.toString())
        router.push(`${pathName}?${newQuery.toString()}`)
    }

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`/api/user?page=${page}&pageSize=${pageSize}`, {
                method: "GET",
            })
            const result = await response.json()
            setAudioData(result.data)
            setTotalPages(result.totalPages)
            setCredits(result.data[0].audio_generations.user.credits)
            const incompleteItems = result.data.filter((item: AudioData) => !item.audio_url)
            if (incompleteItems.length === 0) {
                setIsPolling(false)
                if (intervalIdRef.current) {
                    clearInterval(intervalIdRef.current)
                } else {
                    console.log('[Debug] Polling: All items are ready')

                }
            }
        } catch (error) {
            console.error(error)
        }
    }, [page, pageSize])
    useEffect(() => {
        fetchData()
    }, [page, fetchData])
    useEffect(() => {

        // Initial data fetch
        fetchData()
        // Set up polling interval
        intervalIdRef.current = setInterval(() => {
            if (isPolling) {
                fetchData()
            }
        }, 25000) // Poll every 25 seconds

        // Cleanup function
        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (pageParam) {
            setPage(Number(pageParam))
        }
    }, [pageParam])

    if (audioData === undefined || audioData.length === 0) {
        return <MyMusicSkeleton />
    }

    return (
        <div className="sm:mt-24 mt-12">
            <h1 className='text-center text-3xl font-bold p-4'>
                Credits left: <span className="text-secondary">
                    {credits > 0 ? credits : 0}
                </span>
            </h1>
            <p className="text-center text-xl font-bold mt-4 text-secondary">
                <a href="/ai-music-generator">AI Music Generator &gt;&gt;</a>
            </p>
            <ul role="list" className="max-w-5xl mx-auto grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
                {audioData.map((audio) => (
                    <li
                        key={audio.id}
                        className="flex flex-col"
                    >
                        <div className="card">
                            <figure className="relative">
                                <img
                                    src={audio.image_url}
                                    alt={`The cover image of ${audio.audio_generations.title} song`}
                                    width={200}
                                    height={200}
                                    className='object-cover rounded-3xl'
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Link href={`/music/${audio.audio_generations.id}`}>
                                        {
                                            audio.audio_url && (
                                                <i className="bi bi-play-fill text-8xl text-slate-100 hover:cursor-pointer" ></i>
                                            )
                                        }
                                        {
                                            !audio.audio_url && (
                                                <span className="loading loading-spinner w-16 text-slate-100"></span>
                                            )
                                        }
                                    </Link>
                                </div>
                            </figure>
                            <div className="mt-4 p-2">
                                <h2 className="truncate">{audio.audio_generations.title}</h2>
                                <p className="text-sm">
                                    <span>Music Style</span>
                                    <span className="text-secondary pl-2">{audio.audio_generations.tags}</span>
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-24 pb-12 flex justify-center">
                {
                    audioData && audioData.length > 0 && (
                        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    )
                }
            </div>
        </div>
    )
}
