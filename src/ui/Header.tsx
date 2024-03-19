import { Link } from 'react-router-dom'
import logoImg from '@/assets/logo.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'
import { SearchList } from '@/components/SearchList'
import { gql, useLazyQuery } from '@apollo/client'
import { debounce } from '@/utils'
import { useEffect, useState } from 'react'

const GET_MEDIA_LIST = gql`
    query CurrentSeasonList(
        $page: Int
        $perPage: Int
        $sort: [MediaSort]
        $type: MediaType
        $search: String
    ) {
        Page(page: $page, perPage: $perPage) {
            media(sort: $sort, type: $type, search: $search) {
                id
                title {
                    romaji
                    native
                }
                coverImage {
                    large
                }
                meanScore
                type
                format
            }
        }
    }
`

export const Header = () => {
    const [
        getAnimeData,
        {
            loading: animeListLoading,
            error: animeListError,
            data: animeListData,
        },
    ] = useLazyQuery(GET_MEDIA_LIST, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    })
    const [
        getMangaData,
        {
            loading: mangaListLoading,
            error: mangaListError,
            data: mangaListData,
        },
    ] = useLazyQuery(GET_MEDIA_LIST, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [animeList, setAnimeList] = useState([])
    const [mangaList, setMangaList] = useState([])
    const [isOpenDialog, serIsOpenDialog] = useState(false)

    useEffect(() => {
        setIsLoading(animeListLoading && mangaListLoading)
        setIsError(!!animeListError && !!mangaListError)
        if (animeListData) {
            setAnimeList(animeListData?.Page?.media)
        }
        if (mangaListData) {
            setMangaList(mangaListData?.Page?.media)
        }
    }, [
        animeListData,
        animeListError,
        animeListLoading,
        mangaListData,
        mangaListError,
        mangaListLoading,
    ])

    const performSearch = async (word: string) => {
        if (!word) return

        getAnimeData({
            variables: {
                page: 1,
                perPage: 10,
                sort: 'TRENDING_DESC',
                type: 'ANIME',
                search: word,
            },
        })
        getMangaData({
            variables: {
                page: 1,
                perPage: 10,
                sort: 'TRENDING_DESC',
                type: 'MANGA',
                search: word,
            },
        })
    }

    const debouncedSearch: (arg: string) => void = debounce(performSearch, 1000)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
    }

    const closeHandler = () => {
        serIsOpenDialog(false)
        setAnimeList([])
        setMangaList([])
    }
    const openHandler = () => {
        serIsOpenDialog(true)
    }

    return (
        <header className="fixed w-full h-12 inset-0 flex items-center z-50  before:block before:absolute before:inset-0 before:bg-neutral-900 before:opacity-95">
            <div className="container mx-auto px-4 flex items-center gap-8 relative z-10">
                <div className="text-green-500 text-xl font-medium">
                    <Link to="/" className="flex gap-1 items-center">
                        <img
                            className="w-8 h-8 pointer-events-none"
                            src={logoImg}
                            alt=""
                        />
                        <span className="hidden lg:inline-block">
                            Lass
                            <span className="text-sky-500"> Anime List</span>
                        </span>
                    </Link>
                    <img src="" alt="" />
                </div>
                <ul className="flex gap-8">
                    <li className="text-stone-200 text-lg hover:text-white duration-150">
                        <Link to="/anime">Anime</Link>
                    </li>
                    <li className="text-stone-200 text-lg hover:text-white duration-150">
                        <Link to="/manga">Manga</Link>
                    </li>
                </ul>
                <Dialog open={isOpenDialog}>
                    <DialogTrigger onClick={openHandler}>
                        <Icon
                            path={mdiMagnify}
                            size={1}
                            className="text-white"
                        />
                    </DialogTrigger>
                    <DialogContent closeHandler={closeHandler}>
                        <DialogHeader>
                            <DialogDescription className="text-left mt-8 md:text-center font-medium">
                                Start searching for manga, anime
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full md:w-96 mt-4 flex m-auto gap-4">
                            <Input
                                type="text"
                                onChange={handleSearch}
                                placeholder="Find title"
                                className="tracking-wider font-medium"
                            />
                        </div>
                        <div className="w-full flex justify-center flex-col md:flex-row gap-6">
                            {isLoading && (
                                <div className="h-36 flex justify-center items-center">
                                    <span className="loader-1"></span>
                                </div>
                            )}
                            {!isLoading && (
                                <SearchList
                                    title="Anime"
                                    isLoading={isLoading}
                                    isError={isError}
                                    items={animeList}
                                    closeHandler={closeHandler}
                                />
                            )}
                            {!isLoading && (
                                <SearchList
                                    title="Manga"
                                    isLoading={isLoading}
                                    isError={isError}
                                    items={mangaList}
                                    closeHandler={closeHandler}
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    )
}
