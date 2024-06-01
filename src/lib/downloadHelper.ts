import * as cheerio from 'cheerio'
export const runtime = 'edge'
export const scrapeAudioUrl = async (pageUrl: string) => {
  try {
    // Fetch the HTML content of the page
    const response = await fetch(pageUrl)
    if (!response.ok)
      throw new Error(`Failed to fetch ${pageUrl}: ${response.statusText}`)
    const html = await response.text()
    let audioUrl: string | undefined
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html)

    const scriptTags = $('script').toArray()
    for (let i = 0; i < scriptTags.length; i++) {
      const scriptContent = $(scriptTags[i]).html() || ''
      // Regex to extract the audio_url, ensuring it captures variations
      const regex = /audio_url\\":\\"(https?:\/\/[^"\\]+)\\"/

      const audioUrlMatch = scriptContent.match(regex)
      if (audioUrlMatch && audioUrlMatch[1]) {
        audioUrl = audioUrlMatch[1]
        break // Stop the loop once the audio URL is found
      }
    }
    const headerTexts = $('title').text();
    const [mainTitle] = headerTexts.split(' by ');
    if (audioUrl) {
      // Assuming you have a title or some text to name the file
      const fileName = `${mainTitle || 'downloaded_audio'}`
      const baseUrl = new URL(pageUrl).origin
      const resolvedAudioUrl = audioUrl.startsWith('http')
        ? audioUrl
        : `${baseUrl}/${audioUrl}`

      const audioResponse = await fetch(resolvedAudioUrl)
      const audioBuffer = await audioResponse.arrayBuffer()

      return { audioBuffer, fileName }
    } else {
      console.log('No audio files found on the page.')
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`)
  }
}
