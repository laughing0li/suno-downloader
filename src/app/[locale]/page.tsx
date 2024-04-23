'use client'
import Ads from '@/components/Ads'
import AdSense from '@/components/Adsense';
import Faq from '@/components/Faq'
import { Hero } from '@/components/Hero'
export const runtime = 'edge';

export default function Home() {
  return (

    <>
      <Ads/>
      <Hero />
      <Faq />
    </>

  )
}
{/* <div style={{ position: 'sticky', top: '100px', marginLeft: '20px' }}>
        <AdSense slot={"3676460825"} />
      </div> */}

{/* <div style={{ position: 'sticky', top: '100px', marginLeft: '20px' }}>
        <AdSense slot={"8341629997"} />
      </div> */}