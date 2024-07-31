import { Container } from '@/components/Container'
import SongGenerator from '@/components/SongGenerator'
import React from 'react'
export const runtime = 'edge';
const SunoMusicGenerator = async () => {
    
    return (
        <Container>
            <SongGenerator/>
        </Container>
    )
}

export default SunoMusicGenerator
