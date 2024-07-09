import { AnimeFilters } from '@/types'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useUpdateMediaByParams = (
    filters: AnimeFilters,
    setFilters: React.Dispatch<React.SetStateAction<AnimeFilters>>
) => {
    const [searchParams, setSearchParams] = useSearchParams()

    // Get all search parameters as an object
    const getAllSearchParams = () => {
        const params: { [key: string]: string } = {}
        for (const [key, value] of searchParams.entries()) {
            params[key] = value
        }
        return params
    }

    useEffect(() => {
        const notEmptyParams: Record<string, string> = {}
        for (const key of Object.keys(filters) as (keyof AnimeFilters)[]) {
            if (filters[key] !== null && filters[key] !== undefined) {
                notEmptyParams[key] = String(filters[key])
            }
        }

        const params = new URLSearchParams(notEmptyParams)
        setSearchParams(params)
    }, [filters, setSearchParams])

    useEffect(() => {
        const currentFilters = getAllSearchParams()
        setFilters((prev) => ({
            ...prev,
            ...currentFilters,
        }))
    }, [])

    return {}
}

export default useUpdateMediaByParams
