import Image from 'next/image'
export function Instruction() {
    return (
        <div>
            <h2 className='text-2xl font-bold leading-10 tracking-tight pb-4 text-gray-900'>How to find Suno Music Link?</h2>
            <Image width={400} height={200} alt="" className="float-left mr-10" src="https://raw.githubusercontent.com/laughing0li/FIgureBed/master/suno-downloader/example.png" />
            <p className='text-gray-600 text-medium pb-2'>
                To download a Suno track, you will need the share link of the track you wish to download. Here are some examples of Suno share links:
            </p>
            <ul className='list-disc'>
                <li className='text-gray-600'>https://app.suno.ai/song/b27c29f6-8ab4-47eb-81fd-efb85c848ada</li>
                <li className='text-gray-600'>https://app.suno.ai/song/ad5a966b-dea1-4cbc-aeee-d5e9541157b9</li>
            </ul>
            <p className='text-gray-600 text-medium'>
                Simply paste the share link of the Suno track you wish to download into the input field. Click the download button to fetch the download link. Once the download link is ready, click the download button to save the track to your device. You can find the copy the link as shown in the image.
            </p>
        </div>
    )
}
