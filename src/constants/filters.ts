import { AllFilters } from '@/types'

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
export const SEASON_LIST = [
    {
        id: 'WINTER',
        name: 'Winter',
    },
    {
        id: 'SPRING',
        name: 'Spring',
    },
    {
        id: 'SUMMER',
        name: 'Summer',
    },
    {
        id: 'FALL',
        name: 'Fall',
    },
]
export const GENRE_LIST = [
    {
        id: 'Action',
        name: 'Action',
    },
    {
        id: 'Adventure',
        name: 'Adventure',
    },
    {
        id: 'Comedy',
        name: 'Comedy',
    },
    {
        id: 'Drama',
        name: 'Drama',
    },
    {
        id: 'Ecchi',
        name: 'Ecchi',
    },
    {
        id: 'Fantasy',
        name: 'Fantasy',
    },
    {
        id: 'Hentai',
        name: 'Hentai',
    },
    {
        id: 'Mahou Shoujo',
        name: 'Mahou Shoujo',
    },
    {
        id: 'Mecha',
        name: 'Mecha',
    },
    {
        id: 'Music',
        name: 'Music',
    },
    {
        id: 'Mystery',
        name: 'Mystery',
    },
    {
        id: 'Psychological',
        name: 'Psychological',
    },
    {
        id: 'Sci-Fi',
        name: 'Sci-Fi',
    },
    {
        id: 'Slice of Life',
        name: 'Slice of Life',
    },
    {
        id: 'Sports',
        name: 'Sports',
    },
    {
        id: 'Supernatural',
        name: 'Supernatural',
    },
    {
        id: 'Thriller',
        name: 'Thriller',
    },
]

export const filtersObj: AllFilters = {
    sort: 'SCORE_DESC',
    status: null,
    year: null,
    season: null,
    genres: [],
}
