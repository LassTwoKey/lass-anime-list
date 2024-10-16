import { useQuery } from '@apollo/client'
import { PageWrapper } from '@/ui/PageWrapper'
import { CurrentSeasonList } from '@/components/CurrentSeasonList'
import { ComplexContentList } from '@/components/ComplexContentList/ComplexContentList'
import { capitalizeFirstLetter, getCurrentSeason } from '@/utils'
import { ErrorBlock } from '@/ui/ErrorBlock'
import { GET_MEDIA_LIST } from '@/api/filters'

export const Main = () => {
    const currentSeason = getCurrentSeason()

    const {
        loading: currentListLoading,
        error: currentListError,
        data: currentListData,
    } = useQuery(GET_MEDIA_LIST, {
        variables: {
            page: 1,
            perPage: 10,
            seasonYear: currentSeason.year,
            type: 'ANIME',
            status: 'RELEASING',
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

    if (currentListLoading || animeListLoading || mangaListLoading) {
        return (
            <PageWrapper>
                <div className="h-full flex justify-center items-center">
                    <span className="loader-1"></span>
                </div>
            </PageWrapper>
        )
    }
    if (currentListError || animeListError || mangaListError)
        return (
            <PageWrapper>
                <div className="h-full flex justify-center items-center text-red-500">
                    <ErrorBlock />
                </div>
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
                    <h2 className="font-medium text-xl lg:text-3xl text-white mb-6">
                        {capitalizeFirstLetter(currentSeason.currentSeason)}{' '}
                        <span className="text-red-500">Anime</span>
                    </h2>
                    <CurrentSeasonList list={currentListData.Page.media} />
                </div>
            </div>

            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
                        <div>
                            <h2 className="font-medium text-xl lg:text-3xl text-white mb-6">
                                Trending 📺
                                <span className="text-red-500">Anime</span>
                            </h2>
                            <ComplexContentList
                                list={animeListData.Page.media}
                                type="table"
                            />
                        </div>
                        <div>
                            <h2 className="font-medium text-xl lg:text-3xl text-white mb-6">
                                Trending 📘
                                <span className="text-blue-500">Manga</span>
                            </h2>
                            <ComplexContentList
                                list={mangaListData.Page.media}
                                type="table"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
