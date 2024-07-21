import { AllFilters } from '@/types'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const arrValues = ['genres']

export const useUpdateMediaByParams = (
    filters: AllFilters,
    setFilters: React.Dispatch<React.SetStateAction<AllFilters>>
) => {
    const [searchParams, setSearchParams] = useSearchParams()

    // Get all search parameters as an object
    const getAllSearchParams = () => {
        const params: { [key: string]: string | unknown[] } = {}
        for (const [key, value] of searchParams.entries()) {
            if (arrValues.includes(key)) {
                if (value.length === 1) {
                    params[key] = [value]
                } else {
                    params[key] = value.split(',')
                }
            } else {
                params[key] = value
            }
        }

        return params
    }

    useEffect(() => {
        const notEmptyParams: Record<string, string> = {}
        for (const key of Object.keys(filters) as (keyof AllFilters)[]) {
            if (filters[key] !== null && filters[key] !== undefined) {
                if (
                    arrValues.includes(key as string) &&
                    Array.isArray(filters[key])
                ) {
                    if (
                        (filters[key] as string[]).filter((x: unknown) => x)
                            .length
                    ) {
                        notEmptyParams[key] = (filters[key] as string[]).join(
                            ','
                        )
                    }
                } else {
                    notEmptyParams[key] = String(filters[key])
                }
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
