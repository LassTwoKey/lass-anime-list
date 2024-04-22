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

export type ListType = 'cover' | 'chart' | 'table'
