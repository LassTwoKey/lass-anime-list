import { AnimeFilters } from '@/types'

export const YEAR_LIST = [
    { id: '2024%', name: 2024 },
    { id: '2023%', name: 2023 },
    { id: '2022%', name: 2022 },
    { id: '2021%', name: 2021 },
    { id: '2020%', name: 2020 },
]
export const STATUS_LIST = [
    { id: 'FINISHED', name: 'Finished' },
    { id: 'RELEASING', name: 'Releasing' },
    { id: 'NOT_YET_RELEASED', name: 'Not yet released' },
    { id: 'CANCELLED', name: 'Cancelled' },
]
export const SORT_BY_LIST = [
    {
        id: 'SCORE_DESC',
        name: 'Score',
    },
    {
        id: 'TITLE_ROMAJI',
        name: 'Title',
    },
    {
        id: 'POPULARITY_DESC',
        name: 'Popularity',
    },
    {
        id: 'TRENDING_DESC',
        name: 'Trending',
    },
]

export const filtersObj: AnimeFilters = {
    sort: 'SCORE_DESC',
    status: null,
    year: null,
}
