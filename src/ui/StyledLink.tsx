import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface StyledLinkProps {
    to: string
    children: React.ReactNode
    isAnime?: boolean
    isManga?: boolean
    className?: string
}

export const StyledLink: FC<StyledLinkProps> = (props) => {
    const { to, children, isAnime, isManga , className} = props
    return (
        <Link
            to={to}
            className={cn(
                ' hover:underline duration-150',
                isAnime && 'text-blue-500 hover:text-blue-600',
                isManga && 'text-red-500 hover:text-red-600',
                !isAnime && !isManga && 'text-green-500 hover:text-green-600',
                className
            )}
        >
            {children}
        </Link>
    )
}
