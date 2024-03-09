import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MediaAnimeDetails, MediaMangaDetails } from '@/types'
import notFoundImage from '@/assets/images/not-found.png'
import { Overview } from './components/Overview'
import { Characters } from './components/Characters'
import { Stuff } from './components/Stuff'

interface MediaDetailsProps {
    mediaDetails: MediaAnimeDetails | MediaMangaDetails
}

export const MediaDetails: FC<MediaDetailsProps> = (props) => {
    const { mediaDetails } = props

    return (
        <div className="text-gray-400">
            <div className="relative min-h-40 lg:min-h-96 w-full">
                <img
                    className="absolute left-0 top-0 w-full h-full object-cover"
                    src={mediaDetails.bannerImage || notFoundImage}
                    alt=""
                />
            </div>
            <div className="bg-neutral-900">
                <div className="container mx-auto flex px-4">
                    <div
                        className="-translate-y-1/3 shrink-0"
                        style={{ width: 210 }}
                    >
                        <img
                            src={mediaDetails.coverImage.large}
                            className="max-h-72 rounded-lg overflow-hidden"
                            alt=""
                        />
                    </div>
                    <div className="p-5">
                        <h1 className="text-2xl font-medium mb-3 text-white">
                            {mediaDetails.title.romaji}
                        </h1>
                        <h2 className="mb-3">{mediaDetails.title.native}</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: mediaDetails.description,
                            }}
                        ></p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto flex px-4 pb-8 gap-4">
                <div className="shrink-0" style={{ width: 210 }}></div>
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
                        Стату не сделал, но обязан блэт!
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
