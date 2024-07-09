export const getDynamicSearchParams = (searchParams: URLSearchParams) => {
    const obj: Record<string, string> = {}

    for (const entry of searchParams.entries()) {
        const [param, value] = entry

        obj[param] = value
    }
    return obj
}
