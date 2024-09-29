import { AllFilters } from '@/types'

const getYearsList = () => {
    const currentYear = new Date().getFullYear()
    const yearsArray = []

    for (let year = 1940; year <= currentYear; year++) {
        yearsArray.push({ id: `${year}%`, name: year })
    }
    return yearsArray.reverse()
}

export const YEAR_LIST = getYearsList()
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
export const FORMAT_LIST = [
    {
        id: 'TV',
        name: 'TV Show',
    },
    {
        id: 'TV_SHORT',
        name: 'TV Short',
    },
    {
        id: 'MOVIE',
        name: 'Movie',
    },
    {
        id: 'SPECIAL',
        name: 'Special',
    },
    {
        id: 'OVA',
        name: 'OVA',
    },
    {
        id: 'ONA',
        name: 'ONA',
    },
    {
        id: 'MUSIC',
        name: 'Music',
    },
]

export const YEAR_RANGE: [number, number] = [1969, new Date().getFullYear() + 1]
export const EPISODE_RANGE: [number, number] = [0, 150]
export const DURATION_RANGE: [number, number] = [0, 170]

export const filtersObj: AllFilters = {
    sort: 'SCORE_DESC',
    status: null,
    year: null,
    season: null,
    genres: [],
    format: null,
    yearGreater: null,
    yearLesser: null,
    episodeGreater: null,
    episodeLesser: null,
    durationGreater: null,
    durationLesser: null,
}
