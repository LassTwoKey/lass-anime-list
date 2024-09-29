export type Filter = {
    id: string
    name: string
}

export type FilterValue = string | number | unknown[] | null

export type NameFilter =
    | 'sort'
    | 'status'
    | 'year'
    | 'season'
    | 'genres'
    | 'format'
    | 'yearGreater'
    | 'yearLesser'
    | 'episodeGreater'
    | 'episodeLesser'
    | 'durationGreater'
    | 'durationLesser'

export interface AllFilters {
    [key: string]: unknown | unknown[]
    sort: string | null
    status: string | null
    year: string | null
    season: string | null
    genres: string[]
    format: string | null
    yearGreater: number | null
    yearLesser: number | null
    episodeGreater: number | null
    episodeLesser: number | null
    durationGreater: number | null
    durationLesser: number | null
}
