// import Ads from "@/components/Ads"
import Faq from "@/components/FAQ"
import { Hero } from "@/components/Hero"
export const runtime = 'edge'

export default function Home() {
    return (
        <>
            <main>
                {/* <Ads /> */}
                <Hero />
                <Faq />
            </main>
        </>

    )
}