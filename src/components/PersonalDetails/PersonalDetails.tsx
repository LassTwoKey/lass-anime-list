import { cn } from '@/lib/utils'
import { Character, Staff, StaffMediaItem } from '@/types'
import { getFormattedDate, replaceLinksInText } from '@/utils'
import { FC } from 'react'
import { SimpleContentList } from './SimpleContentList'
import { baseUrl } from '@/constants'

interface PersonalDetailsProps {
    info: Character | Staff
    list?: StaffMediaItem[]
}

interface CurrentInfo extends Character, Staff {}

export const PersonalDetails: FC<PersonalDetailsProps> = (props) => {
    const { info, list } = props

    const currentInfo = info as CurrentInfo

    const isMarginTop = !currentInfo.description.includes('<p><strong>')

    const description = (
        <div
            className={cn('markdown description', isMarginTop && 'pt-4')}
            dangerouslySetInnerHTML={{
                __html: replaceLinksInText(
                    currentInfo.description,
                    'https://anilist.co',
                    baseUrl
                ),
            }}
        ></div>
    )

    const personInfo = {
        Birthday: getFormattedDate(currentInfo.dateOfBirth),
        Age: currentInfo.age,
        Gender: currentInfo.gender,

        // only for staff
        'Blood type': currentInfo.bloodType,
        'Date of death':
            currentInfo.dateOfDeath &&
            getFormattedDate(currentInfo.dateOfDeath),
        'Years active': currentInfo.yearsActive?.join(', '),
        Hometown: currentInfo.homeTown,
        'Primary occupations': currentInfo.primaryOccupations?.join(', '),
    }

    const itemInfoList = []

    for (const key in personInfo) {
        if (Object.prototype.hasOwnProperty.call(personInfo, key)) {
            if (personInfo[key as keyof typeof personInfo]) {
                itemInfoList.push([
                    key,
                    personInfo[key as keyof typeof personInfo],
                ])
            }
        }
    }

    const infoList = (
        <div className="flex mt-4 flex-col">
            {itemInfoList.map((mediaInfo) => (
                <div key={mediaInfo[0]} className="flex gap-1">
                    <div className="font-bold">{mediaInfo[0]}:</div>
                    <div>{mediaInfo[1]}</div>
                </div>
            ))}
        </div>
    )

    const animeList = list?.filter((item) => item.type === 'ANIME')
    const mangaList = list?.filter((item) => item.type === 'MANGA')

    return (
        <div className="text-gray-400 bg-neutral-900 h-full text-sm lg:text-base">
            <div className="relative min-h-40 lg:min-h-96 w-full bg-indigo-950"></div>
            <div>
                <div className="container mx-auto flex px-4 -mb-4 lg:mb-0">
                    <div className="-translate-y-12 lg:-translate-y-28 shrink-0 w-24 lg:w-56">
                        <img
                            src={currentInfo.image.large}
                            className="max-h-32 lg:max-h-72 rounded-lg pointer-events-none select-none"
                            alt=""
                        />
                    </div>
                    <div className="py-4 pl-2 lg:pl-2 lg:py-5">
                        <h1 className="text-lg lg:text-2xl font-medium mb-3 text-white">
                            {currentInfo.name.userPreferred}
                        </h1>
                        <h2 className="mb-3">{currentInfo.name.native}</h2>
                        <div className="hidden lg:block">
                            {infoList}
                            {description}
                        </div>
                    </div>
                </div>
                <div className="container -mt-10 mx-auto pb-4 px-4 block lg:hidden">
                    {infoList}
                    {description}
                </div>
            </div>
            <div className="mb-8">
                {animeList?.length && (
                    <div className="container mx-auto px-4">
                        <h3 className="font-medium text-xl lg:text-3xl text-white mb-6">
                            <span className="text-red-500">ANIME</span> STAFF
                            ROLES
                        </h3>
                        <SimpleContentList list={animeList} />
                    </div>
                )}
            </div>
            <div className="mb-8">
                {mangaList?.length && (
                    <div className="container mx-auto px-4">
                        <h3 className="font-medium text-xl lg:text-3xl text-white mb-6">
                            <span className="text-blue-500">MANGA</span> STAFF
                            ROLES
                        </h3>
                        <SimpleContentList list={mangaList} />
                    </div>
                )}
            </div>
        </div>
    )
}
