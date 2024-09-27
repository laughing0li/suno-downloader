import React, { useEffect, useState } from 'react'

const AIServiceBanner = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        "Create stunning AI-generated images from text!",
        "Train your own AI model with your images!",
        "Unleash your creativity with personalized AI art!"
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])
    if (!isVisible) return null

    return (
        <div className="bg-gradient-to-b from-purple-100 to-white border-b border-purple-200 text-purple-600 py-2 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-grow justify-center">
                    <p className="text-sm font-medium">{slides[currentSlide]}</p>
                    <a
                        href="https://flux1ai.ai/"
                        className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors duration-300 whitespace-nowrap"
                    >
                        AI Image Generator →
                    </a>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-purple-400 hover:text-purple-600 focus:outline-none ml-4"
                    aria-label="Close"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AIServiceBanner