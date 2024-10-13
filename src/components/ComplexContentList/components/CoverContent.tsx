import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

import { Button } from '@/components/ui/button'
import { ChartItem } from '@/types'
import {
    capitalizeFirstLetter,
    getFormattedDate,
    getStringSeparatedByCommas,
    maxLength,
} from '@/utils'
import { cn } from '@/lib/utils'
import {StyledLink} from "@/ui/StyledLink.tsx";
import {GET_ANIME_INFO, GET_MANGA_INFO} from "@/api/coverInfo.ts";

interface CoverContentProps {
    item: ChartItem
}

export const CoverContent: FC<CoverContentProps> = (props) => {
    const { item } = props

    const { loading, error, data } = useQuery(
        item.type === 'ANIME' ? GET_ANIME_INFO : GET_MANGA_INFO,
        {
            variables: {
                id: item.id,
            },
        }
    )

    const [isShowText, setIsShowText] = useState(false)

    if (loading) {
        return (
            <div className="flex justify-center min-h-14 py-4">
                <span className="loader-1"></span>
            </div>
        )
    }

    if (error) {
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
            'Start Date': getFormattedDate(data.Media.startDate),
            'End Date': getFormattedDate(data.Media.endDate),
            Genres: getStringSeparatedByCommas(item.genres),
            Source: capitalizeFirstLetter(data.Media.source).replace('_', ' '),
            Episodes: data.Media.episodes,
            Status: capitalizeFirstLetter(data.Media.status),
            Duration: `${data.Media.duration} mins`,
        }
    } else {
        itemInfo = {
            Type: capitalizeFirstLetter(item.type),
            'Start Date': getFormattedDate(data.Media.startDate),
            'End Date': getFormattedDate(data.Media.endDate),
            Genres: getStringSeparatedByCommas(item.genres),
            Status: capitalizeFirstLetter(data.Media.status),
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

    const getToUrl = (item: ChartItem) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    return (
        <div className="divide-y divide-neutral-700 text-sm lg:text-base">
            <div className="pb-4">
                <StyledLink to={getToUrl(item)} noUnderline={true}>
                    <h3 className="overflow-hidden text-ellipsis text-xl">
                        {item.title.romaji}
                    </h3>
                </StyledLink>

                <p className="text-gray-400">{item.title.native}</p>
            </div>
            <div className={cn('text-gray-400', !!item.description && 'pt-4')}>
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
                {!!item.description && (
                    <div className="flex justify-center mt-4">
                        <Button
                            variant={'secondary'}
                            onClick={() => setIsShowText((prev) => !prev)}
                        >
                            {isShowText ? 'Hide' : 'Read more'}
                        </Button>
                    </div>
                )}
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
