import { CharactersEdge, StudiosEdge } from '@/types'

export const capitalizeFirstLetter = (word: string) => {
    if (!word) return ''
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const getStringSeparatedByCommas = (strArray: string[]) => {
    return strArray.join(', ')
}

export const maxLength = (input: string, maxLength: number) => {
    if (!input) return ''
    if (input.length <= maxLength) {
        return input
    } else {
        return input.substring(0, maxLength - 3) + '...'
    }
}

export const getFormattedDate = (args: {
    day: number | null
    month: number | null
    year: number | null
}) => {
    const { year, month, day } = args

    if (!year || !month || !day) return null
    const date = new Date(year, month - 1, day) // month - 1 because JavaScript months are zero-based

    return `${date.toLocaleString('en-US', { month: 'long' })} ${day}, ${year}`
}

export const getAnimationStudio = (studios: { edges: StudiosEdge[] }) => {
    return capitalizeFirstLetter(
        studios.edges.find((studio) => studio.node.isAnimationStudio)?.node
            .name || ''
    )
}

export const getCharactersName = (characters: { edges: CharactersEdge[] }) => {
    const charactersList = characters.edges.map(
        (character) => character.node.name.userPreferred
    )
    return getStringSeparatedByCommas(charactersList)
}

export const getCurrentSeason = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()

    let currentSeason = null

    switch (currentMonth) {
        case 0:
        case 1:
        case 11:
            currentSeason = 'WINTER'
            break
        case 2:
        case 3:
        case 4:
            currentSeason = 'SPRING'
            break
        case 5:
        case 6:
        case 7:
            currentSeason = 'SUMMER'
            break
        case 8:
        case 9:
        case 10:
            currentSeason = 'FALL'
            break
        default:
            currentSeason = `Can't determine the time of year`
    }

    return {
        year: currentDate.getFullYear(),
        currentSeason,
    }
}

export const calculateRating = (score: number) => {
    if (typeof score === 'number') {
        return (score / 10).toFixed(1)
    }

    return null
}

export { debounce } from '@/utils/debounce'
