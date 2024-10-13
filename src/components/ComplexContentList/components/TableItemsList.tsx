import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { ImageContent } from './ImageContent'
import {
    HoverArrow,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CoverContent } from './CoverContent'
import { getFilterLink, getStringSeparatedByCommas, maxLength } from '@/utils'
import { ChartItem } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ItemsLoader } from './ItemsLoader'
import { getFormat, getFormatName } from '@/utils/media.ts'
import { StyledLink } from '@/ui/StyledLink.tsx'

interface TableItemsListProps {
    list: ChartItem[]
    fetchData?: () => unknown
}

export const TableItemsList: FC<TableItemsListProps> = (props) => {
    const { list, fetchData } = props

    const { pathname } = useLocation()
    const isMediaPage = pathname === '/anime' || pathname === '/manga'

    const getToUrl = (item: ChartItem) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    const isFetchData = typeof fetchData === 'function'

    const performFetch = () => {
        if (fetchData) {
            fetchData()
        }
    }

    const content = (
        <div className="grid gap-6 text-sm lg:text-base">
            {list.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col lg:flex-row bg-neutral-900 rounded-lg"
                >
                    <HoverCard openDelay={500}>
                        <HoverCardTrigger>
                            <ImageContent
                                isSimple={false}
                                classNames="h-32 w-24 lg:h-64 lg:w-44"
                                item={item}
                            />
                        </HoverCardTrigger>
                        <HoverCardContent side={'right'}>
                            <HoverArrow width={25} height={15} />
                            <CoverContent item={item} />
                        </HoverCardContent>
                    </HoverCard>

                    <div className="m-4 flex max-h-56 overflow-hidden flex-col gap-2">
                        <StyledLink to={getToUrl(item)} noUnderline={true}>
                            <h3 className="overflow-hidden text-ellipsis text-xl">
                                {item.title.romaji}
                            </h3>
                        </StyledLink>

                        <p className="text-gray-400">{item.title.native}</p>

                        <div className="flex gap-2 text-white">
                            {isMediaPage && (
                                <p className="whitespace-nowrap">
                                    {getFormatName(
                                        item.format,
                                        item.type === 'ANIME'
                                    )}
                                </p>
                            )}
                            {!isMediaPage &&
                                getFilterLink(
                                    getFormatName(
                                        item.format,
                                        item.type === 'ANIME'
                                    ) as string,
                                    'format',
                                    {
                                        mediaType: getFormat(
                                            item.format,
                                            item.type === 'ANIME'
                                        )?.id,
                                        isSecondary: true,
                                    }
                                )}
                            <span>/</span>
                            {isMediaPage && item.startDate.year}
                            {!isMediaPage &&
                                getFilterLink(
                                    item.startDate.year.toString(),
                                    'year',
                                    {
                                        mediaType: item.type.toLowerCase(),
                                        isSecondary: true,
                                    }
                                )}
                            <span>/</span>
                            {isMediaPage && (
                                <p>{getStringSeparatedByCommas(item.genres)}</p>
                            )}
                            <div>
                                {!isMediaPage &&
                                    getFilterLink('', 'genres', {
                                        genres: item.genres,
                                        mediaType: item.type.toLowerCase(),
                                        isSecondary: true,
                                    })}
                            </div>
                        </div>

                        <div
                            className="text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: maxLength(item.description, 150),
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <InfiniteScroll
            className="px-4 -mx-4"
            dataLength={list.length}
            next={performFetch}
            hasMore={isFetchData}
            loader={<ItemsLoader />}
        >
            {content}
        </InfiniteScroll>
    )
}
