export type { MediaAnimeDetails } from '@/types/AnimeTypes'
export type { MediaMangaDetails } from '@/types/MangaTypes'
export type { Character } from '@/types/CharacterTypes'
export type { Stuff } from '@/types/StuffTypes'
export type { Ranking } from './StatsTypes'
export type { StudiosEdge, CharactersEdge, StuffEdge } from '@/types/EdgeTypes'

export interface ChartItem {
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
    type: 'MANGA' | 'ANIME'
    genres: string[]
    format: string
    description: string
}
