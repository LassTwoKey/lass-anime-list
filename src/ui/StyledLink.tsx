import { cn } from '@/lib/utils'
import {FC, ReactNode} from 'react'
import { Link } from 'react-router-dom'

interface StyledLinkProps {
    to: string
    children: ReactNode
    isSecondary?: boolean
    className?: string
    noUnderline?: boolean
}

export const StyledLink: FC<StyledLinkProps> = (props) => {
    const { to, children, className, isSecondary, noUnderline} = props
    return (
        <Link
            to={to}
            className={cn(
                'hover:underline duration-150',
                noUnderline && 'hover:no-underline',
                !isSecondary && 'text-green-500 hover:text-green-600',
                isSecondary && 'text-white hover:text-gray-300',
                className
            )}
        >
            {children}
        </Link>
    )
}
