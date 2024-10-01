import { FC } from 'react'
import { Link } from 'react-router-dom'

interface StyledLinkProps {
    to: string
    children: React.ReactNode
}

export const StyledLink: FC<StyledLinkProps> = (props) => {
    const { to, children } = props
    return (
        <Link
            to={to}
            className="text-green-500 hover:text-green-600 hover:underline duration-150"
        >
            {children}
        </Link>
    )
}
