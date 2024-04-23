import { useEffect, useRef } from 'react';

interface AdSenseProps {
    slot: string;
}

const AdSense: React.FC<AdSenseProps> = ({ slot }) => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleLoad = () => {
            if (adRef.current) {
                const adElement = adRef.current.querySelector('ins');
                if (adElement) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            }
        };

        if (adRef.current) {
            const scriptElement = document.createElement('script');
            scriptElement.async = true;
            scriptElement.src =
                'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8372997811102254';
            scriptElement.crossOrigin = 'anonymous';
            scriptElement.onload = handleLoad;
            adRef.current.appendChild(scriptElement);
        }

        return () => {
            if (adRef.current) {
                while (adRef.current.firstChild) {
                    adRef.current.removeChild(adRef.current.firstChild);
                }
            }
        };
    }, []);

    return (
        <div ref={adRef}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-8372997811102254"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdSense;