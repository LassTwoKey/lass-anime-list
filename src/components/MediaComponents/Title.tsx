import { cn } from '@/lib/utils'
import { FC } from 'react'

interface TitleProps {
    text: string
    className?: string
}

export const Title: FC<TitleProps> = (props) => {
    const { text, className } = props
    return (
        <h1
            className={cn(
                'font-medium text-xl lg:text-3xl text-white mb-6',
                className
            )}
        >
            <span className="text-red-500">{text}</span>
        </h1>
    )
}
