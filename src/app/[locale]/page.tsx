import Ads from '@/components/Ads'
import Faq from '@/components/Faq'
import { Hero } from '@/components/Hero'
export const runtime = 'edge';

export default function Home() {
  return (
    <>
      <Ads />
      <Hero />
      <Faq />
    </>
  )
}
