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
export const LICENSED_BY_LIST = [
    {
        id: '5',
        name: 'Crunchyroll',
    },
    {
        id: '7',
        name: 'Hulu',
    },
    {
        id: '10',
        name: 'Netflix',
    },
    {
        id: '15',
        name: 'YouTube',
    },
    {
        id: '20',
        name: 'HIDIVE',
    },
    {
        id: '21',
        name: 'Amazon Prime Video',
    },
    {
        id: '22',
        name: 'Vimeo',
    },
    {
        id: '26',
        name: 'HBO Max',
    },
    {
        id: '27',
        name: 'RetroCrush',
    },
    {
        id: '28',
        name: 'Adult Swim',
    },
    {
        id: '29',
        name: 'Japanese Film Archives',
    },
    {
        id: '30',
        name: 'Tubi TV',
    },
    {
        id: '31',
        name: 'Crackle',
    },
    {
        id: '32',
        name: 'AsianCrush',
    },
    {
        id: '33',
        name: 'Midnight Pulp',
    },
    {
        id: '45',
        name: 'Bilibili',
    },
    {
        id: '118',
        name: 'Disney Plus',
    },
    {
        id: '119',
        name: 'Bilibili TV',
    },
    {
        id: '121',
        name: 'Tencent Video',
    },
    {
        id: '122',
        name: 'iQ',
    },
    {
        id: '126',
        name: 'Youku',
    },
    {
        id: '131',
        name: 'WeTV',
    },
    {
        id: '180',
        name: 'Niconico Video',
    },
    {
        id: '204',
        name: 'iQIYI',
    },
    {
        id: '210',
        name: 'Star+',
    },
    {
        id: '211',
        name: 'Max',
    },
    {
        id: '214',
        name: 'Viki',
    },
    {
        id: '216',
        name: 'Cineverse',
    },
    {
        id: '218',
        name: 'Youku TV',
    },
    {
        id: '226',
        name: 'Coolmic',
    },
    {
        id: '230',
        name: 'Criterion Channel',
    },
]
export const COUNTRY_OF_ORIGIN_LIST = [
    {
        id: 'JP',
        name: 'Japan',
    },
    {
        id: 'KR',
        name: 'South Korea',
    },
    {
        id: 'CN',
        name: 'China',
    },
    {
        id: 'TW',
        name: 'Taiwan',
    },
]
export const SOURCE_LIST = [
    {
        id: 'ORIGINAL',
        name: 'Original',
    },
    {
        id: 'MANGA',
        name: 'Manga',
    },
    {
        id: 'LIGHT_NOVEL',
        name: 'Light Novel',
    },
    {
        id: 'WEB_NOVEL',
        name: 'Web Novel',
    },
    {
        id: 'VISUAL_NOVEL',
        name: 'Visual Novel',
    },
    {
        id: 'VIDEO_GAME',
        name: 'Video Game',
    },
    {
        id: 'NOVEL',
        name: 'Novel',
    },
    {
        id: 'DOUJINSHI',
        name: 'Doujinshi',
    },
    {
        id: 'ANIME',
        name: 'Anime',
    },
    {
        id: 'GAME',
        name: 'Game',
    },
    {
        id: 'LIVE_ACTION',
        name: 'Live Action',
    },
    {
        id: 'COMIC',
        name: 'Comic',
    },
    {
        id: 'MULTIMEDIA_PROJECT',
        name: 'Multimedia Project',
    },
    {
        id: 'PICTURE_BOOK',
        name: 'Picture Book',
    },
    {
        id: 'OTHER',
        name: 'Other',
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
    isAdult: false,
    licensedBy: [],
    countryOfOrigin: null,
    source: null,
}
