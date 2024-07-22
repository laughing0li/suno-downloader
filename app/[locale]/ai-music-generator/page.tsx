import { Container } from '@/components/Container'
import SongGenerator from '@/components/SongGenerator'
import React from 'react'
export const runtime = 'edge';
const SunoMusicGenerator = async () => {
    
    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6 text-center mt-16">AI Music Generator</h1>
            <SongGenerator/>
        </Container>
    )
}

export default SunoMusicGenerator
