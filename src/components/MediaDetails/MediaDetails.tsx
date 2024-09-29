import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MediaAnimeDetails, MediaMangaDetails } from '@/types'
import notFoundImage from '@/assets/images/not-found.png'
import { Overview } from './components/Overview'
import { Characters } from './components/Characters'
import { Stuff } from './components/Stuff'
import { Stats } from './components/Stats'

interface MediaDetailsProps {
    mediaDetails: MediaAnimeDetails | MediaMangaDetails
}

export const MediaDetails: FC<MediaDetailsProps> = (props) => {
    const { mediaDetails } = props

    const navigate = useNavigate()
    const isGoBack = window.history.state && window.history.state.idx > 0
    const handleGoBack = () => {
        if (isGoBack) {
            navigate(-1)
        }
    }

    const description = (
        <p
            dangerouslySetInnerHTML={{
                __html: mediaDetails.description,
            }}
        ></p>
    )

    return (
        <div className="text-gray-400 text-sm lg:text-base">
            <div className="relative min-h-40 lg:min-h-96 w-full">
                {isGoBack && (
                    <div className="absolute left-0 top-12 flex items-center h-8 md:h-12 z-10 w-28 bg-gradient-to-r from-neutral-900 opacity-95">
                        <span
                            className="flex gap-1 h-full items-center cursor-pointer"
                            onClick={handleGoBack}
                        >
                            <ChevronLeft
                                className="translate-y-0.5"
                                size={18}
                            />{' '}
                            Back
                        </span>
                    </div>
                )}
                <img
                    className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none"
                    src={mediaDetails.bannerImage || notFoundImage}
                    alt=""
                />
            </div>
            <div className="bg-neutral-900">
                <div className="container mx-auto flex px-4 -mb-4 lg:mb-0">
                    <div className="-translate-y-12 lg:-translate-y-28 shrink-0 w-24 lg:w-56">
                        <img
                            src={mediaDetails.coverImage.large}
                            className="max-h-32 lg:max-h-72 rounded-lg pointer-events-none select-none"
                            alt=""
                        />
                    </div>
                    <div className="py-4 pl-2 lg:pl-2 lg:py-5">
                        <h1 className="text-lg lg:text-2xl font-medium mb-3 text-white">
                            {mediaDetails.title.romaji}
                        </h1>
                        <h2 className="mb-3">{mediaDetails.title.native}</h2>
                        <div className="hidden lg:block">{description}</div>
                    </div>
                </div>
                <div className="container mx-auto pb-4 px-4 block lg:hidden">
                    {description}
                </div>
            </div>
            <div className="container mx-auto flex px-4 pb-8 gap-4">
                <div className="shrink-0 hidden lg:block w-56"></div>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="characters">Characters</TabsTrigger>
                        <TabsTrigger value="staff">Staff</TabsTrigger>
                        <TabsTrigger value="stats">Stats</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Overview mediaDetails={mediaDetails} />
                    </TabsContent>
                    <TabsContent value="characters">
                        <Characters type={mediaDetails.type} />
                    </TabsContent>
                    <TabsContent value="staff">
                        <Stuff type={mediaDetails.type} />
                    </TabsContent>
                    <TabsContent value="stats">
                        <Stats />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
