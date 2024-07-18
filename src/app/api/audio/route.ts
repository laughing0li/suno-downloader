import { downloadAudio, scrapeAudioUrl } from '@/lib/downloadHelper'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 },
    )
  }

//   const audioBuffer = await scrapeAudioUrl(url)
  const audioBuffer = await downloadAudio(url)
  if (!audioBuffer) {
    return NextResponse.json(
      { error: 'Failed to fetch audio file' },
      { status: 404 }
    );
  }
  const fileName = audioBuffer.fileName
  const encodedFileName = encodeURIComponent(fileName);

  const headers = new Headers();
  headers.append('Content-Type', 'audio/mpeg');
  headers.append('Content-Disposition', `attachment; filename*=${encodedFileName}`);

  return new Response(audioBuffer.audioBuffer, { headers});
}
