'use client'
import { BackgroundImage } from '@/components/BackgroundImage'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useState } from 'react'
export function Hero() {
  const [targetUrl, setTargetUrl] = useState('')
  const handleDownloadAudio = async () => {
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
        console.log(decodeURIComponent(filename))
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.href = audioUrl;
        tempLink.download = `${decodeURIComponent(filename)}.mp3`; // Set the desired file name for the download
        tempLink.click();

        URL.revokeObjectURL(audioUrl); // Clean up the temporary URL
      } else {
        console.error('Error fetching audio file');
      }
    } catch (error) {
      console.error('Failed to download audio:', error);
    }
  };

  return (
    <div className="relative py-20 sm:pb-12 sm:pt-24">
      <BackgroundImage position="right" className="-bottom-32 -top-40" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="grid justify-items-center font-display text-2xl font-bold text-blue-600 sm:text-4xl">
            Suno Music Downloader
          </h1>
          <div className="mt-12 flex flex-row gap-10 justify-center">
            <input
              type="url"
              name="name"
              id="name"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="basis block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter Share link"
            />
            <Button
              onClick={handleDownloadAudio}
              type="button"
            >
              Download
            </Button>
          </div>
          
        </div>

      </Container>
    </div>
  )
}
