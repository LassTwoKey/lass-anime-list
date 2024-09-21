import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ImageContent } from './ImageContent'
import {
    HoverArrow,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CoverContent } from './CoverContent'
import { capitalizeFirstLetter } from '@/utils'
import { ChartItem } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ItemsLoader } from './ItemsLoader'

interface CoverItemsListProps {
    list: ChartItem[]
    fetchData?: () => unknown
}

export const CoverItemsList: FC<CoverItemsListProps> = (props) => {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-8 text-sm lg:text-base">
            {list.map((item) => (
                <HoverCard key={item.id} openDelay={500}>
                    <HoverCardTrigger>
                        <div className="flex flex-col relative w-full lg:flex-row bg-neutral-900 rounded-lg">
                            <ImageContent
                                isSimple
                                classNames="w-full pb-[144%]"
                                item={item}
                            />
                        </div>
                        <div>
                            <Link to={getToUrl(item)}>
                                <h3 className="text-green-500 pt-3 hover:text-green-600 duration-150 w-full truncate overflow-hidden text-ellipsis">
                                    {item.title.romaji}
                                </h3>
                            </Link>
                            <div className="flex gap-2 text-white">
                                <p>{capitalizeFirstLetter(item.format)}</p>
                                <span>/</span>
                                {item.startDate.year}
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent side={'right'}>
                        <HoverArrow width={25} height={15} />
                        <CoverContent item={item} />
                    </HoverCardContent>
                </HoverCard>
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
