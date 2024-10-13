import { FC } from 'react'
import { ComplexContentList } from '@/components/ComplexContentList/ComplexContentList'
import { cn } from '@/lib/utils'
import { AllFilters, ListType } from '@/types'
import { ErrorBlock } from '@/ui/ErrorBlock'
import useMedia from '@/hooks/useMedia'

interface MediaBlockProps {
    className: string
    type: ListType
    filters: AllFilters
    isAnime: boolean
}

export const MediaBlock: FC<MediaBlockProps> = (props) => {
    const { className, type, filters, isAnime } = props

    const {
        content: { loading, error, data },
        fetchData,
    } = useMedia(filters, isAnime ? 'ANIME' : 'MANGA')

    return (
        <div className={cn(className)}>
            {!!data.length && (
                <ComplexContentList
                    list={data}
                    type={type}
                    fetchData={fetchData}
                />
            )}
            {!data.length && loading && (
                <div className="py-24 flex justify-center items-center">
                    <span className="loader-1"></span>
                </div>
            )}
            {!data.length && error && (
                <div className="h-full flex justify-center items-center text-red-500">
                    <ErrorBlock />
                </div>
            )}
            {!data.length && !error && !loading && (
                <div className="h-full flex justify-center items-center text-gray-400 font-medium text-2xl">
                    No Result
                </div>
            )}
        </div>
    )
}
