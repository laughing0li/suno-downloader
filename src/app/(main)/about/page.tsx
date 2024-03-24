import { Container } from "@/components/Container"

export default function About() {
    return (
        <Container>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About</h1>
                        <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
                            <div>
                                <p>
                                    Welcome to <a className="text-indigo-600" href="/">Suno Songs Downloader</a>, your premier destination for downloading Suno music effortlessly to any device—be it a computer, tablet, or mobile phone. Our platform simplifies the music downloading process, making it accessible, fast, and, most importantly, free.
                                </p>
                                <p className="mt-8">
                                    We offers a fast, reliable, and entirely free service, ensuring you have access to unlimited Suno AI music downloads without a hitch. Our downloads are quick and user-friendly, keeping all processes streamlined for your convenience.

                                    Simply copy the link of the Suno song you wish to download, paste it into our site’s main page, and hit “Download.” It’s that easy!
                                </p>
                            </div>
                            <div>
                                <p>
                                    We’re dedicated to enhancing your experience. Our team regularly updates the Suno Music Downloader to optimize the download process and site functionality, ensuring you enjoy our service to the fullest. However, occasional technical adjustments on the backend may affect loading times. Rest assured, we’re on top of resolving any issues swiftly, minimizing any disruption to your music downloading activities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
