import { cn } from '@/lib/utils'
import { Character } from '@/types'
import { getFormattedDate } from '@/utils'
import { FC } from 'react'

interface PersonalDetailsProps {
    character: Character
}

export const PersonalDetails: FC<PersonalDetailsProps> = (props) => {
    const { character } = props

    const isMarginTop = !character.description.includes('<p><strong>')

    const description = (
        <div
            className={cn('markdown description', isMarginTop && 'pt-4')}
            dangerouslySetInnerHTML={{
                __html: character.description,
            }}
        ></div>
    )
    // Origin =========================
    // getFormattedDate(character.dateOfBirth)
    // Origin =========================

    // getFormattedDate({year: 2000, month: 3, day: 18})
    // getFormattedDate({year: 2000, month: 3, day: null})
    // getFormattedDate({year: 2000, month: null, day: null})
    // getFormattedDate({year: null, month: null, day: null})

    // getFormattedDate({year: null, month: 3, day: 18})
    // getFormattedDate({year: null, month: null, day: 18})
    // getFormattedDate({year: null, month: 3, day: null})
    const personInfo = {
        Birthday: getFormattedDate(character.dateOfBirth),
        Age: character.age,
        Gender: character.gender,
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

    return (
        <div className="text-gray-400 bg-neutral-900 h-full text-sm lg:text-base">
            <div className="relative min-h-40 lg:min-h-96 w-full bg-indigo-950"></div>
            <div>
                <div className="container mx-auto flex px-4 -mb-4 lg:mb-0">
                    <div className="-translate-y-12 lg:-translate-y-28 shrink-0 w-24 lg:w-56">
                        <img
                            src={character.image.large}
                            className="max-h-32 lg:max-h-72 rounded-lg pointer-events-none select-none"
                            alt=""
                        />
                    </div>
                    <div className="py-4 pl-2 lg:pl-2 lg:py-5">
                        <h1 className="text-lg lg:text-2xl font-medium mb-3 text-white">
                            {character.name.userPreferred}
                        </h1>
                        <h2 className="mb-3">{character.name.native}</h2>
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
        </div>
    )
}
