export default function DiscoverSkeleton() {
    const audioData = Array.from({ length: 16 }, (_, i) => i + 1)
    return (
        <div className="sm:pt-24 pt-12 bg-gradient-to-r from-[#ECF5FF] via-[#d2deee] to-[#ECF5FF]">
            <h1 className='text-center text-3xl font-bold p-4'>
                Discover all the AI music
            </h1>
            <p className="text-center text-xl font-bold mt-4">
                <a href="/ai-music-generator">AI Music Generator &gt;&gt;</a>
            </p>
            <ul role="list" className="max-w-5xl mx-auto grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
                {audioData.map((audio) => (
                    <li
                        key={audio}
                        className="flex flex-col"
                    >
                        <div className="card">
                            <div className="flex flex-col gap-4 w-52">
                                <div className="skeleton h-32 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    )
}
