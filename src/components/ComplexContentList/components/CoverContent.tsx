import { FC, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Button } from '@/components/ui/button'
import { ChartItem } from '@/types'
import {
    capitalizeFirstLetter,
    getFormattedDate,
    getStringSeparatedByCommas,
    maxLength,
} from '@/utils'

const GET_ANIME_INFO = gql`
    query GetItemInfo($id: Int) {
        Media(id: $id) {
            episodes
            duration
            status
            source
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
        }
    }
`
const GET_MANGA_INFO = gql`
    query GetItemInfo($id: Int) {
        Media(id: $id) {
            status
            source
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
        }
    }
`

interface CoverContentProps {
    item: ChartItem
}

export const CoverContent: FC<CoverContentProps> = (props) => {
    const { item } = props

    const {
        loading: loadingAnime,
        error: errorAnime,
        data: dataAnime,
    } = useQuery(GET_ANIME_INFO, {
        variables: {
            id: item.id,
        },
    })

    const {
        loading: loadingManga,
        error: errorManga,
        data: dataManga,
    } = useQuery(GET_MANGA_INFO, {
        variables: {
            id: item.id,
        },
    })

    const [isShowText, setIsShowText] = useState(false)

    if (loadingAnime || loadingManga) {
        return (
            <div className="flex justify-center min-h-14 py-4">
                <span className="loader-1"></span>
            </div>
        )
    }

    if (errorAnime || errorManga) {
        return (
            <div className="text-red-500 font-medium flex justify-center max-h-24 py-4">
                <p className="text-lg">Error in loading</p>
            </div>
        )
    }

    let itemInfo = null

    if (item.type === 'ANIME') {
        itemInfo = {
            Type: capitalizeFirstLetter(item.type),
            'Start Date': getFormattedDate(dataAnime.Media.startDate),
            'End Date': getFormattedDate(dataAnime.Media.endDate),
            Genres: getStringSeparatedByCommas(item.genres),
            Source: capitalizeFirstLetter(dataAnime.Media.source),
            Episodes: dataAnime.Media.episodes,
            Status: capitalizeFirstLetter(dataAnime.Media.status),
            Duration: `${dataAnime.Media.duration} mins`,
        }
    } else {
        itemInfo = {
            Type: capitalizeFirstLetter(item.type),
            'Start Date': getFormattedDate(dataManga.Media.startDate),
            'End Date': getFormattedDate(dataManga.Media.endDate),
            Genres: getStringSeparatedByCommas(item.genres),
            Status: capitalizeFirstLetter(dataManga.Media.status),
        }
    }

    const itemInfoList = []

    for (const key in itemInfo) {
        if (Object.prototype.hasOwnProperty.call(itemInfo, key)) {
            if (itemInfo[key as keyof typeof itemInfo]) {
                itemInfoList.push([key, itemInfo[key as keyof typeof itemInfo]])
            }
        }
    }

    return (
        <div className="divide-y divide-neutral-700 text-sm lg:text-base">
            <div className="pb-4">
                <h3 className="text-green-500 text-xl">{item.title.romaji}</h3>
                <p className="text-gray-400">{item.title.native}</p>
            </div>
            <div className="pt-4 text-gray-400">
                {!isShowText && (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: maxLength(item.description, 150),
                        }}
                    ></p>
                )}
                {isShowText && (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: item.description,
                        }}
                    ></p>
                )}
                <div className="flex justify-center mt-4">
                    <Button
                        variant={'secondary'}
                        onClick={() => setIsShowText((prev) => !prev)}
                    >
                        {isShowText ? 'Hide' : 'Read more'}
                    </Button>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                    {itemInfoList.map((infoItem) => (
                        <div key={infoItem[0]} className="grid grid-cols-2">
                            <div>{infoItem[0]}</div>
                            <div>{infoItem[1]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
