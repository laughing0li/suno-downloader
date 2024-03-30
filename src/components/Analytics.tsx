import Script from 'next/script'

const Analytics = () => (
    <>
        <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-7D50BY3S2N');
                `,
            }}
        />
        <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ll1eku95o2");
        `
            }}
        />
        <Script
            id="umami-script"
            strategy="afterInteractive"
            src="https://us.umami.is/script.js"
            data-website-id="4d0dbce4-7128-45e2-a865-3f6afb8178a5"
        />
    </>
)

export default Analytics
