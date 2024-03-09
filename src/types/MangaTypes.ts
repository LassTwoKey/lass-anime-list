import { CharactersEdge } from './EdgeTypes'

export interface MediaMangaDetails {
    id: number
    title: {
        romaji: string
        native: string
    }
    coverImage: {
        large: string
    }
    bannerImage: string
    meanScore: number
    type: 'MANGA'
    genres: string[]
    format: string
    description: string
    status: string
    source: string
    startDate: {
        year: number
        month: number
        day: number
    }
    endDate: {
        year: number | null
        month: number | null
        day: number | null
    }
    characters: {
        edges: CharactersEdge[]
    }
}
