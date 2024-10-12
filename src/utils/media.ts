import { CharactersEdge } from '@/types'
import { FORMAT_LIST, MANGA_FORMAT_LIST } from "@/constants/filters.ts";

export const getCharactersName = (characters: { edges: CharactersEdge[] }) => {
    return characters.edges.map((character) => ({
        content: character.node.name.userPreferred,
        id: character.node.id,
    }))
}

export const getCurrentSeason = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()

    let currentSeason = null
    let prevSeason = null

    switch (currentMonth) {
        case 0:
        case 1:
        case 11:
            currentSeason = 'WINTER'
            prevSeason = 'FALL'
            break
        case 2:
        case 3:
        case 4:
            currentSeason = 'SPRING'
            prevSeason = 'WINTER'
            break
        case 5:
        case 6:
        case 7:
            currentSeason = 'SUMMER'
            prevSeason = 'SPRING'
            break
        case 8:
        case 9:
        case 10:
            currentSeason = 'FALL'
            prevSeason = 'SUMMER'
            break
        default:
            currentSeason = `Can't determine the time of year`
            prevSeason = `Can't determine the time of year`
    }

    return {
        year: currentDate.getFullYear(),
        currentSeason,
        prevSeason,
    }
}

export const calculateRating = (score: number) => {
    if (typeof score === 'number') {
        return (score / 10).toFixed(1)
    }

    return null
}

export const getFormatName = (id:string, isAnime: boolean) => {
    if (isAnime) return FORMAT_LIST.find(item => item.id === id)?.name
    return MANGA_FORMAT_LIST.find(item => item.id === id)?.name
}
