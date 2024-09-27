// app/api/getUserCountry/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cfCountry = request.headers.get('cf-ipcountry')
  
  if (cfCountry) {
    return NextResponse.json({ 
      country: cfCountry, 
      source: 'Cloudflare' 
    })
  } else {
    // Fallback if CF-IPCountry is not available
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : request.ip
    
    return NextResponse.json({ 
      country: 'Unknown', 
      detectedIP: ip, 
      source: 'Application Fallback' 
    })
  }
}