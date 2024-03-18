import { SearchAnimeDetails } from '@/types'
import { ErrorBlock } from '@/ui/ErrorBlock'
import { capitalizeFirstLetter } from '@/utils'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface SearchListProps {
    items: SearchAnimeDetails[]
    isLoading: boolean
    isError: boolean
    closeHandler: () => void
}

export const SearchList: FC<SearchListProps> = (props) => {
    const { items, isLoading, isError, closeHandler } = props

    if (isLoading) {
        return (
            <div className="h-36 flex justify-center items-center">
                <span className="loader-1"></span>
            </div>
        )
    }
    if (isError)
        return (
            <div className="min-h-36 py-4 flex justify-center items-center text-red-500">
                <ErrorBlock />
            </div>
        )

    const getToUrl = (item: SearchAnimeDetails) => {
        return item.type === 'ANIME' ? `/anime/${item.id}` : `/manga/${item.id}`
    }

    const ListCompont = (
        <div className="">
            <h2 className="text-red-500 pt-4 text-lg">Anime</h2>
            <div className="py-4 grid gap-4">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <Link
                            to={getToUrl(item)}
                            onClick={closeHandler}
                            className="h-32 w-24 shrink-0 inline-flex relative"
                        >
                            <img
                                className="rounded-lg absolute left-0 top-0 w-full h-full object-cover overflow-hidden"
                                src={item.coverImage.large}
                                alt=""
                            />
                        </Link>
                        <span>
                            <Link to={getToUrl(item)} onClick={closeHandler}>
                                <h3 className=" text-green-500 text-xl text-left hover:text-green-600 duration-150">
                                    {item.title.romaji}
                                </h3>
                            </Link>
                            <span className="flex gap-2 text-white">
                                <p>{capitalizeFirstLetter(item.format)}</p>
                                <span>/</span>
                                2024
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )

    return <div>{!!items.length && ListCompont}</div>
}
