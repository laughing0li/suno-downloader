'use client'
import { BackgroundImage } from '@/components/BackgroundImage'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import AdSense from './Adsense'

export function Hero() {
  const t = useTranslations('heroSection')
  const [targetUrl, setTargetUrl] = useState('')
  const [isDownloading, setIsDownloading] = useState(false);
  const [isError, setIsError] = useState(false);

  function isValidURL(str: string) {
    try {
      const url = new URL(str);
      return url.href !== undefined;
    } catch (err) {
      return false;
    }
  }

  const handleDownloadAudio = async () => {
    setIsDownloading(true); // Disable the button
    if (!isValidURL(targetUrl)) {
      setIsError(true);
      setIsDownloading(false); // Enable the button
      return;
    }
    try {
      const response = await fetch('/api/audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      });
      if (response.ok) {
        const filename = response.headers.get('Content-Disposition')?.split('=')[1] ?? 'audio.mp3'; // Add nullish coalescing operator to provide a default value
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.href = audioUrl;
        tempLink.download = `${decodeURIComponent(filename)}.mp3`; // Set the desired file name for the download
        tempLink.click();

        URL.revokeObjectURL(audioUrl); // Clean up the temporary URL
      } else {
        setIsError(true);
      }
    } catch (error) {
      alert('Failed to download audio file');
    }
    setTargetUrl(''); // Clear the input field
    setIsDownloading(false); // Enable the button
  };

  const handleClearError = () => {
    setIsError(false);
  };

  return (
    <div className="relative sm:pt-24">
      <BackgroundImage position="right" className="-bottom-20 -top-40" />
      <Container className="relative">
        <div className="mx-auto max-w-xl lg:max-w-3xl lg:px-12">
          {isError && (
            <div role="alert" className="alert alert-error mb-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 hover:" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" onClick={handleClearError} /></svg>
              <span>{t('error')}</span>
            </div>
          )}

          <div className="mt-12 flex flex-row gap-10 justify-center">
            <input
              type="url"
              name="name"
              id="name"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="basis block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:text-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={t('placeholder')}
            />
            {isDownloading ? (
              <span className="loading loading-bars text-indigo-600 loading-lg" />
            ) : (
              <Button
                className='w-40'
                onClick={handleDownloadAudio}
                type="button"
              >
                {t('button')}
              </Button>
            )}
          </div>
          <div className='sm:mt-20 mt-10'>
            <AdSense slot={"3719858701"} />
          </div>
        </div>

      </Container>
    </div>
  )
}
