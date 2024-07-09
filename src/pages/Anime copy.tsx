import { ComplexContentList } from '@/components/ComplexContentList/ComplexContentList'
import { ErrorBlock } from '@/ui/ErrorBlock'
import { PageWrapper } from '@/ui/PageWrapper'
import { gql, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@mdi/react'
import { mdiViewGrid, mdiViewList, mdiViewModule } from '@mdi/js'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MediaFilters } from '@/components/MediaFilters/MediaFilters'
import { filters } from '@/constants/filters'
import { ChartItem, ListType } from '@/types'
import { ChevronDown } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const GET_MEDIA_LIST = gql`
    query CurrentSeasonList(
        $page: Int
        $perPage: Int
        $sort: [MediaSort]
        $type: MediaType
    ) {
        Page(page: $page, perPage: $perPage) {
            media(sort: $sort, type: $type, status: RELEASING) {
                id
                title {
                    romaji
                    native
                }
                coverImage {
                    large
                }
                bannerImage
                meanScore
                type
                genres
                format
                description
            }
        }
    }
`

export const Anime = () => {
    const currentType = (localStorage.getItem('animeType') ??
        'chart') as ListType
    const [type, setType] = useState(currentType)
    const [filter, setFilter] = useState(filters[0])

    const [
        getAnimeData,
        { loading: animeListLoading, error: animeListError, data },
    ] = useLazyQuery(GET_MEDIA_LIST, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    })

    const [animeListData, setAnimeListData] = useState<ChartItem[]>([])
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()

    const selectChartHanlder = () => {
        setType('chart')
        localStorage.setItem('animeType', 'chart')
    }
    const selectCoverHanlder = () => {
        setType('cover')
        localStorage.setItem('animeType', 'cover')
    }
    const selectTableHanlder = () => {
        setType('table')
        localStorage.setItem('animeType', 'table')
    }

    const animeFilterHandler = (filter: { id: string; name: string }) => {
        setFilter(filter)
        setAnimeListData([])
        const params = new URLSearchParams({ sortBy: filter.id })
        setSearchParams(params)
    }

    const fetchData = async () => {
        await getAnimeData({
            variables: {
                page: page + 1,
                perPage: 10,
                sort: filter.id,
                type: 'ANIME',
            },
        })

        setPage((prev) => prev + 1)
    }

    // Подгрузка списка при изменении фильтра
    useEffect(() => {
        getAnimeData({
            variables: {
                page: 1,
                perPage: 10,
                sort: filter.id,
                type: 'ANIME',
            },
        })
    }, [getAnimeData, filter.id])

    // тут бы чекать по id для большей безопасности, но вродь все ок работает без дупликатов
    useEffect(() => {
        if (data?.Page?.media) {
            setAnimeListData((prev) => prev.concat(data?.Page?.media))
        }
    }, [data?.Page?.media])

    // Установка фильтрова из url
    useEffect(() => {
        if (!searchParams.get('sortBy')) {
            const params = new URLSearchParams({ sortBy: filter.id })
            setSearchParams(params)
        }

        const currentFilter = filters.find(
            (item) => item.id === searchParams.get('sortBy')
        )

        if (currentFilter) setFilter(currentFilter)
    }, [])

    return (
        <PageWrapper>
            <div className="pt-12 text-gray-400">
                <div className="container mx-auto px-4">
                    <div className="py-4">
                        <h1 className="font-medium text-xl lg:text-3xl text-white mb-6">
                            <span className="text-red-500">📺 Anime</span>
                        </h1>

                        <div className="flex justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">Sort by:</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="text-white flex gap-4"
                                            variant="outline"
                                        >
                                            {filter.name}
                                            <ChevronDown size={18} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {filters.map((filter) => (
                                            <DropdownMenuItem
                                                key={filter.id}
                                                onClick={() =>
                                                    animeFilterHandler(filter)
                                                }
                                            >
                                                {filter.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div>
                                <Button
                                    className={cn(
                                        'px-1 hover:text-gray-300 translate-y-[1px]',
                                        type === 'cover' && 'text-white'
                                    )}
                                    onClick={selectCoverHanlder}
                                    variant="transparent"
                                >
                                    <Icon path={mdiViewModule} size={1.55} />
                                </Button>
                                <Button
                                    className={cn(
                                        'hidden md:inline-block px-1 -translate-y-[5px] hover:text-gray-300',
                                        type === 'chart' && 'text-white'
                                    )}
                                    onClick={selectChartHanlder}
                                    variant="transparent"
                                >
                                    <Icon
                                        className="translate-x-[1px]"
                                        path={mdiViewGrid}
                                        size={1.12}
                                    />
                                </Button>
                                <Button
                                    className={cn(
                                        'px-1 -translate-y-[1px] hover:text-gray-300',
                                        type === 'table' && 'text-white'
                                    )}
                                    onClick={selectTableHanlder}
                                    variant="transparent"
                                >
                                    <Icon path={mdiViewList} size={1.4} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <MediaFilters
                                className="mb-6 w-56"
                                type="ANIME"
                                filterHandler={animeFilterHandler}
                                filters={filter}
                            />
                            <div className="flex-1">
                                {/* {!!animeListData.length && (
                                    <ComplexContentList
                                        list={animeListData}
                                        type={type}
                                        fetchData={fetchData}
                                    />
                                )}
                                {!animeListData.length && animeListLoading && (
                                    <div className="py-24 flex justify-center items-center">
                                        <span className="loader-1"></span>
                                    </div>
                                )}
                                {!animeListData.length && animeListError && (
                                    <div className="h-full flex justify-center items-center text-red-500">
                                        <ErrorBlock />
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
