import { ComplexContentList } from '@/components/ComplexContentList/ComplexContentList'
import { ErrorBlock } from '@/ui/ErrorBlock'
import { PageWrapper } from '@/ui/PageWrapper'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@mdi/react'
import { mdiViewGrid, mdiViewList, mdiViewModule } from '@mdi/js'
import { cn } from '@/lib/utils'

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
    const {
        loading: animeListLoading,
        error: animeListError,
        data: animeListData,
    } = useQuery(GET_MEDIA_LIST, {
        variables: {
            page: 1,
            perPage: 10,
            sort: 'TRENDING_DESC',
            type: 'ANIME',
        },
    })

    const [type, setType] = useState<'chart' | 'cover' | 'table'>('chart')

    if (animeListLoading) {
        {
            return (
                <PageWrapper>
                    <div className="h-full flex justify-center items-center">
                        <span className="loader-1"></span>
                    </div>
                </PageWrapper>
            )
        }
    }
    if (animeListError) {
        return (
            <PageWrapper>
                <div className="h-full flex justify-center items-center text-red-500">
                    <ErrorBlock />
                </div>
            </PageWrapper>
        )
    }

    const selectChartHanlder = () => {
        setType('chart')
    }
    const selectCoverHanlder = () => {
        setType('cover')
    }
    const selectTableHanlder = () => {
        setType('table')
    }
    return (
        <PageWrapper>
            <div className="pt-12">
                <div className="container mx-auto px-4">
                    <div className="py-4">
                        <h1 className="font-medium text-xl lg:text-3xl text-white mb-6">
                            <span className="text-red-500">Anime</span>
                        </h1>

                        <div className="flex justify-end mb-3">
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
                                        'px-1 -translate-y-[5px] hover:text-gray-300',
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

                        <ComplexContentList
                            list={animeListData.Page.media}
                            type={type}
                        />
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
