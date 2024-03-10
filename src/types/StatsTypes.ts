export interface Ranking {
    id: number
    type: 'RATED' | 'POPULAR'
    rank: number
    context: string
    season: string | null
    year: number | null
}
