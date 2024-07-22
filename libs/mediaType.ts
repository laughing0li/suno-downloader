export interface User {
    id: string
    free: number
    email: string
    credits: number | null
    price_id: string | null
    full_name: string
    avatar_url: string
    created_at: string
    has_access: boolean | null
    customer_id: string | null
}
export interface MediaUrl {
    id: string
    generation_id: string
    audio_url: string
    image_url: string
    version: number
    audio_generations: AudioGeneration
}
export interface AudioGeneration {
    id: string
    tags: string
    user: User
    title: string
    prompt: string
    user_id: string
    duration: string | null // Adjust the type if needed
    created_at: string
    model_name: string
}