import { FC } from 'react'
import {
    capitalizeFirstLetter,
    getCharactersName,
    getFilterLink,
    getFormattedDate,
} from '@/utils'
import { MediaAnimeDetails, MediaMangaDetails } from '@/types'
import {getFormatName} from "@/utils/media.ts";

interface OverviewProps {
    mediaDetails: MediaAnimeDetails | MediaMangaDetails
}

export const Overview: FC<OverviewProps> = (props) => {
    const { mediaDetails } = props

    let mediaInfo = null
    const mediaType = mediaDetails.type.toLowerCase()
    if (mediaDetails.type === 'ANIME') {
        const animeDetails = mediaDetails as MediaAnimeDetails
        mediaInfo = {
            Type: getFormatName(animeDetails.format, true),
            'Start Date': getFormattedDate(animeDetails.startDate),
            'End Date': getFormattedDate(animeDetails.endDate),
            Genres: getFilterLink('', 'genres', {
                genres: animeDetails.genres,
                mediaType
            }),
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
                    mediaType,
                }
            ),
            Studio: getFilterLink(
                mediaDetails.studios.edges[0]?.node?.name,
                'studio',
                {
                    studioId: mediaDetails.studios.edges[0]?.node?.id,
                    mediaType,
                }
            ),
            Characters: getFilterLink('', 'characters', {
                characters: getCharactersName(animeDetails.characters),
            }),
        }
    }

    if (mediaDetails.type === 'MANGA') {
        const mangaDetails = mediaDetails as MediaMangaDetails
        mediaInfo = {
            Type: getFormatName(mangaDetails.format, false),
            'Start Date': getFormattedDate(mangaDetails.startDate),
            'End Date': getFormattedDate(mangaDetails.endDate),
            Genres: getFilterLink('', 'genres', {
                genres: mangaDetails.genres,
                mediaType,
            }),
            Source: capitalizeFirstLetter(mangaDetails.source).replace(
                '_',
                ' '
            ),
            Status: getFilterLink(
                capitalizeFirstLetter(mangaDetails.status),
                'status'
            ),
            Characters: getFilterLink('', 'characters', {
                characters: getCharactersName(mangaDetails.characters),
            }),
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
                        <div className="font-medium text-slate-50">{mediaInfo[0]}</div>
                        <div>{mediaInfo[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
