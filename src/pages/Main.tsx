import { gql, useQuery } from '@apollo/client'

import { PageWrapper } from '@/ui/PageWrapper'
import { CurrentSeasonList } from '@/components/CurrentSeasonList'
import { ComplexContentList } from '@/components/ComplexContentList/ComplexContentList'
import { capitalizeFirstLetter, getCurrentSeason } from '@/utils'

const GET_CURRENT_SEASON_LIST = gql`
    query CurrentSeasonList($page: Int, $perPage: Int, $seasonYear: Int) {
        Page(page: $page, perPage: $perPage) {
            media(seasonYear: $seasonYear, type: ANIME, status: RELEASING) {
                id
                title {
                    romaji
                    native
                }
                coverImage {
                    large
                }
                meanScore
            }
        }
    }
`

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

export const Main = () => {
    const currentSeason = getCurrentSeason()
    const {
        loading: currentListLoading,
        error: currentListError,
        data: currentListData,
    } = useQuery(GET_CURRENT_SEASON_LIST, {
        variables: {
            page: 1,
            perPage: 10,
            seasonYear: currentSeason.year,
        },
    })

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

    const {
        loading: mangaListLoading,
        error: mangaListError,
        data: mangaListData,
    } = useQuery(GET_MEDIA_LIST, {
        variables: {
            page: 1,
            perPage: 10,
            sort: 'TRENDING_DESC',
            type: 'MANGA',
        },
    })

    if (currentListLoading || animeListLoading || mangaListLoading)
        return (
            <PageWrapper>
                <div>Loading...</div>
            </PageWrapper>
        )
    if (currentListError || animeListError || mangaListError)
        return (
            <PageWrapper>
                <div>Error in loading data :(</div>
            </PageWrapper>
        )

    return (
        <PageWrapper>
            <div className="bg-neutral-900 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-medium text-3xl text-white mb-4">
                        Welcome to Lass Anime List
                    </h1>
                    <p className="text-white">
                        Here you can find information about various manga and
                        anime based on on The AniList GraphQL Api. Powerful
                        access to over 500k anime and manga entries, including
                        character, staff, and live airing data.
                    </p>
                </div>
            </div>

            <div className="py-8">
                <div className="container mx-auto px-4">
                    <h2 className="font-medium text-3xl text-white mb-6">
                        {capitalizeFirstLetter(currentSeason.currentSeason)}{' '}
                        <span className="text-red-500">Anime</span>
                    </h2>
                    <CurrentSeasonList list={currentListData.Page.media} />
                </div>
            </div>

            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                        <div>
                            <h2 className="font-medium text-3xl text-white mb-6">
                                Trending{' '}
                                <span className="text-red-500">Anime</span>
                            </h2>
                            <ComplexContentList
                                list={animeListData.Page.media}
                                type="chart"
                            />
                        </div>
                        <div>
                            <h2 className="font-medium text-3xl text-white mb-6">
                                Trending{' '}
                                <span className="text-blue-500">Manga</span>
                            </h2>
                            <ComplexContentList
                                list={mangaListData.Page.media}
                                type="chart"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
