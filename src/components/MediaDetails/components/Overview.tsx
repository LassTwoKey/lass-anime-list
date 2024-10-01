import { FC } from 'react'
import {
    capitalizeFirstLetter,
    createJsxLinks,
    getCharactersName,
    getFormattedDate,
    getStringSeparatedByCommas,
} from '@/utils'
import { MediaAnimeDetails, MediaMangaDetails } from '@/types'
import { Link } from 'react-router-dom'

interface OverviewProps {
    mediaDetails: MediaAnimeDetails | MediaMangaDetails
}

export const Overview: FC<OverviewProps> = (props) => {
    const { mediaDetails } = props

    let mediaInfo = null

    if (mediaDetails.type === 'ANIME') {
        const animeDetails = mediaDetails as MediaAnimeDetails
        mediaInfo = {
            Type: capitalizeFirstLetter(animeDetails.type),
            'Start Date': getFormattedDate(animeDetails.startDate),
            'End Date': getFormattedDate(animeDetails.endDate),
            Genres: getStringSeparatedByCommas(animeDetails.genres),
            Source: capitalizeFirstLetter(animeDetails.source).replace(
                '_',
                ' '
            ),
            Episodes: animeDetails.episodes,
            Status: capitalizeFirstLetter(animeDetails.status),
            Duration: animeDetails.duration && `${animeDetails.duration} mins`,
            Season: `${capitalizeFirstLetter(animeDetails.season)} ${animeDetails.seasonYear}`,
            Studio: mediaDetails.studios.edges[0].node.name,
            Characters: createJsxLinks(
                getCharactersName(animeDetails.characters),
                '/character'
            ),
        }
    }

    if (mediaDetails.type === 'MANGA') {
        const mangaDetails = mediaDetails as MediaMangaDetails
        mediaInfo = {
            Type: capitalizeFirstLetter(mangaDetails.type),
            'Start Date': getFormattedDate(mangaDetails.startDate),
            'End Date': getFormattedDate(mangaDetails.endDate),
            Genres: getStringSeparatedByCommas(mangaDetails.genres),
            Source: capitalizeFirstLetter(mangaDetails.source).replace(
                '_',
                ' '
            ),
            Status: capitalizeFirstLetter(mangaDetails.status),
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

    const studioLink =
        mediaDetails.type === 'ANIME' &&
        `/studio/${mediaDetails.studios.edges[0].node.id}/${mediaDetails.studios.edges[0].node.name}`

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
            <h2 className="text-lg lg:text-2xl font-medium my-3">Additional</h2>
            {studioLink && (
                <div>
                    <div>
                        <span className="font-medium">Studios:</span>{' '}
                        <Link
                            to={studioLink}
                            className="text-green-500 hover:text-green-600 hover:underline duration-150"
                        >
                            {mediaDetails.studios.edges[0].node.name}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
