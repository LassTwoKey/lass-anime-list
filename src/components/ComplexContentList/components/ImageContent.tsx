import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ScoreBadge } from '@/ui/ScoreBadge'

import { ChartItem } from '@/types'
import notFoundImg from '@/assets/images/not-found.png'
import { cn } from '@/lib/utils'

interface ImageContentProps {
    isSimple: boolean
    classNames: string
    item: ChartItem
}

export const ImageContent: FC<ImageContentProps> = (props) => {
    const { item, classNames, isSimple } = props

    const imageClasses = `${classNames} shrink-0 relative hidden lg:block`

    const getToUrl = (item: ChartItem) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    return (
        <>
            {!isSimple && (
                <div className={imageClasses}>
                    <ScoreBadge value={item.meanScore} isAbsolute />
                    <Link to={getToUrl(item)}>
                        <img
                            className="absolute left-0 top-0 w-full h-full object-cover rounded-l-lg overflow-hidden"
                            src={item.coverImage.large}
                            alt=""
                        />
                    </Link>
                </div>
            )}

            {!isSimple && (
                <div className="block lg:hidden relative w-full h-36">
                    <ScoreBadge value={item.meanScore} isAbsolute />
                    <Link to={getToUrl(item)}>
                        <img
                            className="absolute left-0 top-0 w-full h-full object-cover rounded-t-lg overflow-hidden"
                            src={
                                item.bannerImage ||
                                item.coverImage.large ||
                                notFoundImg
                            }
                            alt=""
                        />
                    </Link>
                </div>
            )}

            {isSimple && (
                <div className={cn(classNames)}>
                    <ScoreBadge value={item.meanScore} isAbsolute />
                    <Link to={getToUrl(item)}>
                        <img
                            className="absolute left-0 top-0 w-full h-full object-cover rounded-lg overflow-hidden"
                            src={item.coverImage.large}
                            alt=""
                        />
                    </Link>
                </div>
            )}
        </>
    )
}
