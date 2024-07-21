import { ComplexContentList } from '@/components/ComplexContentList/ComplexContentList'
import { ErrorBlock } from '@/ui/ErrorBlock'
import { PageWrapper } from '@/ui/PageWrapper'
import { gql, useLazyQuery } from '@apollo/client'
import { SetStateAction, useEffect, useState } from 'react'
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
import { ChartItem, ListType } from '@/types'

import { SORT_BY_LIST } from '@/constants/filters'

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
                startDate {
                    year
                }
            }
        }
    }
`

export const Manga = () => {
    const currentType = (localStorage.getItem('mangaType') ??
        'chart') as ListType
    const [type, setType] = useState(currentType)
    const [filter, setFilter] = useState(SORT_BY_LIST[0])

    const [
        getMangaData,
        { loading: mangaListLoading, error: mangaListError, data },
    ] = useLazyQuery(GET_MEDIA_LIST, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    })

    const [mangaListData, setMangaListData] = useState<ChartItem[]>([])
    const [page, setPage] = useState(1)

    const selectChartHanlder = () => {
        setType('chart')
        localStorage.setItem('mangaType', 'chart')
    }
    const selectCoverHanlder = () => {
        setType('cover')
        localStorage.setItem('mangaType', 'cover')
    }
    const selectTableHanlder = () => {
        setType('table')
        localStorage.setItem('mangaType', 'table')
    }

    const mangaFilterHandler = (
        filter: SetStateAction<{ id: string; name: string }>
    ) => {
        setFilter(filter)
        setMangaListData([])
    }

    const fetchData = async () => {
        await getMangaData({
            variables: {
                page: page + 1,
                perPage: 10,
                sort: filter.id,
                type: 'MANGA',
            },
        })

        setPage((prev) => prev + 1)
    }

    useEffect(() => {
        getMangaData({
            variables: {
                page: 1,
                perPage: 10,
                sort: filter.id,
                type: 'MANGA',
            },
        })
    }, [getMangaData, filter.id])

    useEffect(() => {
        // тут бы чекать по id для большей безопасности, но вродь все ок работает без дупликатов
        if (data?.Page?.media) {
            setMangaListData((prev) => prev.concat(data?.Page?.media))
        }
    }, [data?.Page?.media])

    return (
        <PageWrapper>
            <div className="pt-12 text-gray-400">
                <div className="container mx-auto px-4">
                    <div className="py-4">
                        <h1 className="font-medium text-xl lg:text-3xl text-white mb-6">
                            <span className="text-blue-500">📘 Manga</span>
                        </h1>

                        <div className="flex justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">Sort by:</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="text-white"
                                            variant="outline"
                                        >
                                            {filter.name}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {SORT_BY_LIST.map((filter) => (
                                            <DropdownMenuItem
                                                key={filter.id}
                                                onClick={() =>
                                                    mangaFilterHandler(filter)
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

                        {!!mangaListData.length && (
                            <ComplexContentList
                                list={mangaListData}
                                type={type}
                                fetchData={fetchData}
                            />
                        )}
                        {!mangaListData.length && mangaListLoading && (
                            <div className="py-24 flex justify-center items-center">
                                <span className="loader-1"></span>
                            </div>
                        )}
                        {!mangaListData.length && mangaListError && (
                            <div className="h-full flex justify-center items-center text-red-500">
                                <ErrorBlock />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
