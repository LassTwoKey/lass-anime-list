export type Filter = {
    id: string
    name: string
}

export type FilterValue = string | unknown[]

export type NameFilter =
    | 'sort'
    | 'status'
    | 'year'
    | 'season'
    | 'genres'
    | 'format'

export interface AllFilters {
    [key: string]: unknown | unknown[]
    sort: string | null
    status: string | null
    year: string | null
    season: string | null
    genres: string[]
    format: string | null
}
