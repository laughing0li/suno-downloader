// import * as cheerio from 'cheerio'
export const runtime = 'edge'
// export const scrapeAudioUrl = async (pageUrl: string) => {
//   try {
//     // Fetch the HTML content of the page
//     const response = await fetch(pageUrl)
//     if (!response.ok)
//       throw new Error(`Failed to fetch ${pageUrl}: ${response.statusText}`)
//     const html = await response.text()
//     let audioUrl: string | undefined
//     // Load the HTML content into Cheerio
//     const $ = cheerio.load(html)

//     const scriptTags = $('script').toArray()
//     for (let i = 0; i < scriptTags.length; i++) {
//       const scriptContent = $(scriptTags[i]).html() || ''
//       // Regex to extract the audio_url, ensuring it captures variations
//       const regex = /audio_url\\":\\"(https?:\/\/[^"\\]+)\\"/

//       const audioUrlMatch = scriptContent.match(regex)
//       if (audioUrlMatch && audioUrlMatch[1]) {
//         audioUrl = audioUrlMatch[1]
//         break // Stop the loop once the audio URL is found
//       }
//     }
//     const headerTexts = $('title').text();
//     const [mainTitle] = headerTexts.split(' by ');
//     if (audioUrl) {
//       // Assuming you have a title or some text to name the file
//       const fileName = `${mainTitle || 'downloaded_audio'}`
//       const baseUrl = new URL(pageUrl).origin
//       const resolvedAudioUrl = audioUrl.startsWith('http')
//         ? audioUrl
//         : `${baseUrl}/${audioUrl}`

//       const audioResponse = await fetch(resolvedAudioUrl)
//       const audioBuffer = await audioResponse.arrayBuffer()

//       return { audioBuffer, fileName }
//     } else {
//       console.log('No audio files found on the page.')
//     }
//   } catch (error) {
//     console.error(`An error occurred: ${error}`)
//   }
// }
export const downloadAudio = async (pageUrl: string) => {
    const suno_id = getStringAfterSong(pageUrl)
    const audioUrl = `https://cdn1.suno.ai/${suno_id}.mp3`
    const audioResponse = await fetch(audioUrl)
    if (!audioResponse.ok) {
      throw new Error(`Failed to fetch audio file: ${audioResponse.statusText}`)
    }
    const audioBuffer = await audioResponse.arrayBuffer()
    const fileName = `audio`
    return { audioBuffer, fileName }
}

function getStringAfterSong(url: string): string | null {
  const regex = /song\/([^\/]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}