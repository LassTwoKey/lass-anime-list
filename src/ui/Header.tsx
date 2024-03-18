import { Link } from 'react-router-dom'
import logoImg from '@/assets/logo.png'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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
        getData,
        {
            loading: animeListLoading,
            error: animeListError,
            data: animeListData,
        },
    ] = useLazyQuery(GET_MEDIA_LIST, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [listData, setListData] = useState([])
    const [isOpenDialog, serIsOpenDialog] = useState(false)

    useEffect(() => {
        setIsLoading(animeListLoading)
        setIsError(!!animeListError)
        if (animeListData) {
            setListData(animeListData?.Page?.media)
        }
    }, [animeListData, animeListLoading, animeListError])

    const performSearch = async (word: string) => {
        if (!word) return

        getData({
            variables: {
                page: 1,
                perPage: 10,
                sort: 'TRENDING_DESC',
                type: 'ANIME',
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
        setListData([])
    }
    const openHandler = () => {
        serIsOpenDialog(true)
    }

    return (
        <header className="fixed w-full h-12 inset-0 flex items-center z-50  before:block before:absolute before:inset-0 before:bg-neutral-900 before:opacity-95">
            <div className="container mx-auto px-4 flex items-center gap-8 relative z-10">
                <div className="text-green-500 text-xl font-medium">
                    <Link to="/" className="flex gap-1 items-center">
                        <img className="w-8 h-8" src={logoImg} alt="" />
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
                            <DialogTitle className="md:text-center">
                                Start searching for manga, anime
                            </DialogTitle>
                        </DialogHeader>
                        <div className="w-full md:w-96 mt-12 flex m-auto gap-4">
                            <Input
                                type="text"
                                onChange={handleSearch}
                                placeholder="Find title"
                            />
                        </div>
                        <div className="w-full">
                            <SearchList
                                isLoading={isLoading}
                                isError={isError}
                                items={listData}
                                closeHandler={closeHandler}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    )
}
