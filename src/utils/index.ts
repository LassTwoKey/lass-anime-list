export const capitalizeFirstLetter = (word: string) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const getStringSeparatedByCommas = (strArray: string[]) => {
    return strArray.join(', ')
}

export const maxLength = (input: string, maxLength: number) => {
    if (input.length <= maxLength) {
        return input
    } else {
        return input.substring(0, maxLength - 3) + '...'
    }
}

export const getFormattedDate = (args: {
    day: number
    month: number
    year: number
}) => {
    const { year, month, day } = args

    if (!year || !month || !day) return null
    const date = new Date(year, month - 1, day) // month - 1 because JavaScript months are zero-based

    return `${date.toLocaleString('en-US', { month: 'long' })} ${day}, ${year}`
}
