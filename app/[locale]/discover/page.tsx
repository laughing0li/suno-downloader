'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import DiscoverSkeleton from "@/components/skeleton/DiscoverSkeleton"
import PaginationControls from "@/components/PaginationControls"
import type { AudioGeneration } from "@/libs/mediaType"

export const runtime = 'edge'

interface AudioData {
    id: string
    audio_uri: string
    image_url: string
    audio_generations: AudioGeneration
}

export default function DiscoverDisplay() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const pageParam = searchParams.get('page')
    const [totalPages, setTotalPages] = useState(0)
    const [pageSize] = useState(32) // Fixed page size for simplicity
    const [page, setPage] = useState(Number(pageParam) || 1)
    const [audioData, setAudioData] = useState<AudioData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/discover?page=${page}&pageSize=${pageSize}`, {
                    method: "GET",
                })
                const result = await response.json()
                setAudioData(result.data)
                setTotalPages(result.totalPages)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [page, pageSize])
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        const newQuery = new URLSearchParams(searchParams.toString())
        newQuery.set('page', newPage.toString())
        router.push(`${pathName}?${newQuery.toString()}`)
    }

    useEffect(() => {
        if (pageParam) {
            setPage(Number(pageParam))
        }
    }, [pageParam])

    if (audioData === undefined || audioData.length === 0) {
        return <DiscoverSkeleton />
    }
    return (
        <div className="sm:pt-24 pt-12 bg-gradient-to-r from-[#ECF5FF] via-[#d2deee] to-[#ECF5FF]">
            <h1 className='text-center text-3xl font-bold p-4'>
                The Library of AI Music
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
                                        <i className="bi bi-play-fill text-8xl text-slate-100 hover:cursor-pointer" ></i>
                                    </Link>
                                </div>
                            </figure>
                            <div className="mt-4 p-2">
                                <p className="truncate">{audio.audio_generations.title}</p>
                                <p className="text-sm">
                                    Created by {audio.audio_generations.user.full_name} with <a href="/ai-music-generator" className="text-indigo-500">AI Music Generator</a>
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
