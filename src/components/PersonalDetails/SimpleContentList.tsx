import { StaffMediaItem } from '@/types'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ScoreBadge } from '@/ui/ScoreBadge'

interface ListType extends StaffMediaItem {
    uniqueId?: number
}
interface SimpleContentListProps {
    list: ListType[]
}

export const SimpleContentList: FC<SimpleContentListProps> = (props) => {
    const { list } = props

    const getToUrl = (item: StaffMediaItem) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-8 text-sm lg:text-base">
            {list.map((item) => (
                <div key={item.uniqueId}>
                    <Link
                        to={getToUrl(item)}
                        className="flex flex-col pb-[134%] relative w-full lg:flex-row bg-neutral-900 rounded-lg"
                    >
                        <img
                            className="absolute left-0 top-0 w-full h-full object-cover rounded-lg overflow-hidden"
                            src={item.coverImage.large}
                            alt=""
                        />
                        <ScoreBadge value={item.meanScore} isAbsolute />
                    </Link>
                    <div>
                        <Link to={getToUrl(item)}>
                            <h3 className="text-green-500 pt-3 hover:text-green-600 duration-150 w-full truncate overflow-hidden text-ellipsis">
                                {item.title.romaji}
                            </h3>
                        </Link>
                        <div className="flex gap-2">{item.staffRole}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
