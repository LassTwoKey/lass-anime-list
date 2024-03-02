import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ChartItem } from '@/types'
import notFoundImg from '@/assets/images/not-found.png'

interface ImageContentProps {
    classNames: string
    item: ChartItem
}

export const ImageContent: FC<ImageContentProps> = (props) => {
    const { item, classNames } = props

    const imageClasses = `${classNames} shrink-0 relative hidden lg:block`

    const getToUrl = (item: ChartItem) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    let calcRating

    if (typeof item.meanScore === 'number') {
        calcRating = (item.meanScore / 10).toFixed(1)
    }

    return (
        <>
            <div className={imageClasses}>
                <span className="absolute -left-2 top-2 w-12 h-7 z-10 text-black text-lg flex justify-center items-center rounded-sm font-bold bg-yellow-400">
                    {calcRating}
                </span>
                <Link to={getToUrl(item)}>
                    <img
                        className="absolute left-0 top-0 w-full h-full object-cover rounded-l-lg overflow-hidden"
                        src={item.coverImage.large}
                        alt=""
                    />
                </Link>
            </div>
            <div className='block lg:hidden relative w-full h-36'>
                <span className="absolute -left-2 top-2 w-12 h-7 z-10 text-black text-lg flex justify-center items-center rounded-sm font-bold bg-yellow-400">
                    {calcRating}
                </span>
                <Link to={getToUrl(item)}>
                    <img
                        className="absolute left-0 top-0 w-full h-full object-cover rounded-t-lg overflow-hidden"
                        src={item.bannerImage || item.coverImage.large || notFoundImg}
                        alt=""
                    />
                </Link>
            </div>
        </>
    )
}
