import { FC } from 'react'
import { ImageContent } from './ImageContent'
import {
    HoverArrow,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CoverContent } from './CoverContent'
import { getStringSeparatedByCommas, maxLength } from '@/utils'
import { ChartItem } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ItemsLoader } from './ItemsLoader'
import { getFormatName } from '@/utils/media.ts'
import { StyledLink } from '@/ui/StyledLink.tsx'

interface ChartItemsListProps {
    list: ChartItem[]
    fetchData?: () => unknown
}

export const ChartItemsList: FC<ChartItemsListProps> = (props) => {
    const { list, fetchData } = props

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm lg:text-base">
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
                            <p className="whitespace-nowrap">
                                {getFormatName(
                                    item.format,
                                    item.type === 'ANIME'
                                )}
                            </p>
                            <span>/</span>
                            {item.startDate.year}
                            <span>/</span>
                            <p>{getStringSeparatedByCommas(item.genres)}</p>
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
