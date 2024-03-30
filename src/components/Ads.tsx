import Script from 'next/script'

const Ads = () => (
    <>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8372997811102254"
            crossOrigin="anonymous"></Script>
        <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-48MVDH1X2C"
        />
    </>
)

export default Ads
