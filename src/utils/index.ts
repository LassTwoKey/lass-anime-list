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
        return new Date(2000, month, 1).toLocaleString('en', {
            month: 'long',
        })
    }

    if (year) {
        return `${year} year`
    }

    return null
}

export const isProd = import.meta.env.PROD

export {
    getCharactersName,
    getCurrentSeason,
    calculateRating,
} from '@/utils/media'
export { debounce } from '@/utils/debounce'
export { getFilterLink, parseWithLinks } from '@/utils/linkUtils'
export { getDynamicSearchParams } from '@/utils/query'
export { getObjWithoutEmptyValues } from '@/utils/objects'
