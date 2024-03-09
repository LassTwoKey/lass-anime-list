import { CharactersEdge, StudiosEdge } from './EdgeTypes'

export interface MediaAnimeDetails {
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
    type: 'ANIME'
    genres: string[]
    format: string
    description: string
    episodes: number
    duration: number
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
    season: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL'
    seasonYear: number
    studios: {
        edges: StudiosEdge[]
    }
    characters: {
        edges: CharactersEdge[]
    }
}
