import React from 'react'

const DisplaySkeleton = () => {
    const audioData = Array.from({ length: 2 }, (_, i) => i + 1)
  return (
    <ul role="list" className="max-w-5xl mx-auto grid sm:grid-cols-2 place-items-center grid-cols-1 p-8 sm:gap-x-24 flex-grow">
    {audioData.map((audio) => (
        <li
            key={audio}
            className="flex flex-col"
        >
            <div className="card">
                <div className="flex flex-col gap-4 w-80">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>


        </li>
    ))}
</ul>
  )
}

export default DisplaySkeleton
