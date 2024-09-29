import { AllFilters } from '@/types'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const arrValues = ['genres', 'licensedBy']

export const useUpdateMediaFilterParams = (filters: AllFilters) => {
    const [, setSearchParams] = useSearchParams()

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

    return {}
}

export default useUpdateMediaFilterParams
