import { AllFilters } from '@/types'
// import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const arrValues = ['genres', 'licensedBy']

export const useMediaFilters = (filters?: AllFilters) => {
    const [searchParams] = useSearchParams()

    // Get all search parameters as an object
    const getAllSearchParams = () => {
        const params: { [key: string]: string | unknown[] | boolean } = {}
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

            if (params[key] === 'false' || params[key] === 'true') {
                params[key] = params[key] === 'false' ? false : true
            }
        }

        return params
    }

    return {
        ...filters,
        ...(getAllSearchParams() as AllFilters),
    }
}

export default useMediaFilters
