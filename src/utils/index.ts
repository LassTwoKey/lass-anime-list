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

    if (day && month && year) {
        const monthText = new Date(year, month - 1, day).toLocaleString(
            'en-US',
            { month: 'long' }
        )
        return `${monthText} ${day}, ${year}`
    }

    if (month && year) {
        const monthText = new Date(2000, month, 1).toLocaleString('en', {
            month: 'long',
        })
        return `${monthText}, ${year}`
    }

    if (day && year) {
        return `${day}, ${year}`
    }

    if (day && month) {
        const monthText = new Date(2000, month, 1).toLocaleString('en', {
            month: 'long',
        })
        return `${monthText} ${day}`
    }

    if (day) {
        return `${day} day`
    }

    if (month) {
        const monthText = new Date(2000, month, 1).toLocaleString('en', {
            month: 'long',
        })
        return monthText
    }

    if (year) {
        return `${year} year`
    }

    return null
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
