import { FC } from 'react'
import { SimpleContentList } from './SimpleContentList'
import { StaffMediaItem } from '@/types'
import { GoBack } from '@/ui/GoBack'

interface NonPersonalDetails {
    name: string
    list: StaffMediaItem[]
}

export const NonPersonalDetails: FC<NonPersonalDetails> = (props) => {
    const { name, list } = props

    return (
        <div className="pt-12 pb-8">
            <div className="relative h-12 lg:h-16">
                <GoBack isNoOffset />
            </div>
            <div className="container mx-auto px-4">
                <h1 className="mb-12 lg:mb-16 text-lg lg:text-2xl font-medium text-white">
                    {name}
                </h1>
                <div>{!!list?.length && <SimpleContentList list={list} />}</div>
            </div>
        </div>
    )
}
