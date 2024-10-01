import { FC } from 'react'
import { calculateRating } from '@/utils'
import { cn } from '@/lib/utils'

interface ScoreBadge {
    value: number
    isAbsolute?: boolean
    className?: string
}

export const ScoreBadge: FC<ScoreBadge> = (props) => {
    const { value, isAbsolute, className } = props

    const absuluteClasses = 'absolute -left-2 top-2'

    return (
        <>
            {!!calculateRating(value) && (
                <span
                    className={cn(
                        'w-12 h-7 z-10 text-black text-lg flex justify-center items-center rounded-sm font-bold bg-yellow-400',
                        isAbsolute && absuluteClasses,
                        className
                    )}
                >
                    {calculateRating(value)}
                </span>
            )}
        </>
    )
}
