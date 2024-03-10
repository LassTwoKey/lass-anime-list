import { FC } from 'react'

import { Header } from './Header'

interface PageWrapperProps {
    children: React.ReactNode | React.ReactElement
}

export const PageWrapper: FC<PageWrapperProps> = (props) => {
    const { children } = props
    return (
        <>
            <Header />
            <main className="bg-zinc-800">{children}</main>
        </>
    )
}
