import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ImageContent } from './ImageContent'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CoverContent } from './CoverContent'
import {
    capitalizeFirstLetter,
    getStringSeparatedByCommas,
    maxLength,
} from '@/utils'
import { ChartItem } from '@/types'

interface TableItemsListProps {
    list: ChartItem[]
}

export const TableItemsList: FC<TableItemsListProps> = (props) => {
    const { list } = props

    const getToUrl = (item: ChartItem) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    return (
        <div className="grid gap-6 text-sm lg:text-base">
            {list.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col lg:flex-row bg-neutral-900 rounded-lg"
                >
                    <HoverCard openDelay={200}>
                        <HoverCardTrigger>
                            <ImageContent
                                isSimple={false}
                                classNames="h-32 w-24 lg:h-64 lg:w-44"
                                item={item}
                            />
                        </HoverCardTrigger>
                        <HoverCardContent side={'right'}>
                            <CoverContent item={item} />
                        </HoverCardContent>
                    </HoverCard>

                    <div className="m-4 flex max-h-56 overflow-hidden flex-col gap-2">
                        <Link to={getToUrl(item)}>
                            <h3 className=" overflow-hidden text-ellipsis text-green-500 text-xl hover:text-green-600 duration-150">
                                {item.title.romaji}
                            </h3>
                        </Link>

                        <p className="text-gray-400">{item.title.native}</p>

                        <div className="flex gap-2 text-white">
                            <p>{capitalizeFirstLetter(item.format)}</p>
                            <span>/</span>
                            2024
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
}
