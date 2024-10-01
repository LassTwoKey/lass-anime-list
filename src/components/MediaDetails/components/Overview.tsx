import { FC } from 'react'
import {
    capitalizeFirstLetter,
    createJsxLinks,
    getCharactersName,
    getFormattedDate,
    getStringSeparatedByCommas,
} from '@/utils'
import { MediaAnimeDetails, MediaMangaDetails } from '@/types'
import { StyledLink } from '@/ui/StyledLink'

interface OverviewProps {
    mediaDetails: MediaAnimeDetails | MediaMangaDetails
}

interface ValueObject {
    season?: string
    year?: number
    genres?: string[]
}

export const Overview: FC<OverviewProps> = (props) => {
    const { mediaDetails } = props

    let mediaInfo = null
    const mediaType = mediaDetails.type.toLowerCase()

    const getFilterLink = (
        value: string,
        filterName: string,
        values?: ValueObject
    ) => {
        switch (filterName) {
            case 'type':
                return <StyledLink to={`/${mediaType}`}>{value}</StyledLink>
            case 'status':
                return (
                    <StyledLink
                        to={`/${mediaType}?status=${value.toUpperCase()}`}
                    >
                        {value}
                    </StyledLink>
                )
            case 'season':
                return (
                    <StyledLink
                        to={`/${mediaType}?season=${values?.season}&year=${values?.year}%`}
                    >
                        {value}
                    </StyledLink>
                )
            case 'studio':
                return (
                    <StyledLink
                        to={
                            mediaDetails.type === 'ANIME'
                                ? `/studio/${mediaDetails.studios.edges[0].node.id}/${mediaDetails.studios.edges[0].node.name}`
                                : ''
                        }
                    >
                        {value}
                    </StyledLink>
                )
            case 'genres':
                if (!values?.genres?.length) return ''

                return values?.genres?.map((genre, index) => (
                    <span key={genre}>
                        <StyledLink to={`/${mediaType}?genres=${genre}`}>
                            {genre}
                        </StyledLink>
                        {values.genres?.length - 1 !== index ? ', ' : ''}
                    </span>
                ))
            default:
                return ''
        }
    }

    if (mediaDetails.type === 'ANIME') {
        const animeDetails = mediaDetails as MediaAnimeDetails
        mediaInfo = {
            Type: getFilterLink(
                capitalizeFirstLetter(animeDetails.type),
                'type'
            ),
            'Start Date': getFormattedDate(animeDetails.startDate),
            'End Date': getFormattedDate(animeDetails.endDate),
            Genres: getFilterLink(
                getStringSeparatedByCommas(animeDetails.genres),
                'genres',
                {
                    genres: animeDetails.genres,
                }
            ),
            Source: capitalizeFirstLetter(animeDetails.source).replace(
                '_',
                ' '
            ),
            Episodes: animeDetails.episodes,
            Status: getFilterLink(
                capitalizeFirstLetter(animeDetails.status),
                'status'
            ),
            Duration: animeDetails.duration && `${animeDetails.duration} mins`,
            Season: getFilterLink(
                `${capitalizeFirstLetter(animeDetails.season)} ${animeDetails.seasonYear}`,
                'season',
                {
                    season: animeDetails.season,
                    year: animeDetails.seasonYear,
                }
            ),
            Studio: getFilterLink(
                mediaDetails.studios.edges[0].node.name,
                'studio'
            ),
            Characters: createJsxLinks(
                getCharactersName(animeDetails.characters),
                '/character'
            ),
        }
    }

    if (mediaDetails.type === 'MANGA') {
        const mangaDetails = mediaDetails as MediaMangaDetails
        mediaInfo = {
            Type: getFilterLink(
                capitalizeFirstLetter(mangaDetails.type),
                'type'
            ),
            'Start Date': getFormattedDate(mangaDetails.startDate),
            'End Date': getFormattedDate(mangaDetails.endDate),
            Genres: getFilterLink(
                getStringSeparatedByCommas(mangaDetails.genres),
                'genres',
                {
                    genres: mangaDetails.genres,
                }
            ),
            Source: capitalizeFirstLetter(mangaDetails.source).replace(
                '_',
                ' '
            ),
            Status: getFilterLink(
                capitalizeFirstLetter(mangaDetails.status),
                'status'
            ),
            Characters: createJsxLinks(
                getCharactersName(mangaDetails.characters),
                '/character'
            ),
        }
    }

    const itemInfoList = []

    for (const key in mediaInfo) {
        if (Object.prototype.hasOwnProperty.call(mediaInfo, key)) {
            if (mediaInfo[key as keyof typeof mediaInfo]) {
                itemInfoList.push([
                    key,
                    mediaInfo[key as keyof typeof mediaInfo],
                ])
            }
        }
    }

    return (
        <div>
            <div className="mt-4 flex flex-col gap-3">
                {itemInfoList.map((mediaInfo) => (
                    <div key={`${mediaInfo[0]}`} className="grid grid-cols-2">
                        <div className="font-medium">{mediaInfo[0]}</div>
                        <div>{mediaInfo[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
