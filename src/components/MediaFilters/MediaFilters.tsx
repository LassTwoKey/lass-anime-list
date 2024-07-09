import { getDynamicSearchParams } from '@/utils'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterDropdown } from './FilterDropdown'

import { YEAR_LIST, STATUS_LIST } from './static/filters'
interface MediaFiltersProps {
    type: 'ANIME' | 'MANGA'
    className?: string
    filterHandler: (filter: { id: string; name: string }) => void
}

export const MediaFilters: FC<MediaFiltersProps> = (props) => {
    const { type, className, filterHandler } = props

    const title = type === 'ANIME' ? 'Anime filters' : 'Manga filters'

    const [searchParams, setSearchParams] = useSearchParams()

    const onChangeFilter = (allFilters) => {
        const notEmptyParams = {}

        for (const key in allFilters) {
            if (allFilters[key]) {
                notEmptyParams[key] = allFilters[key]
            }
        }

        const params = new URLSearchParams(notEmptyParams)
        setSearchParams(params)
    }

    const [filters, setFilters] = useState({
        sortBy: searchParams.get('sortBy'),
        year: null,
        status: null,
    })

    useEffect(() => {
        setFilters(getDynamicSearchParams(searchParams))
    }, [])

    return (
        <div className={className}>
            <h3 className="text-white font-medium text-xl mb-4">{title}</h3>

            <div className="grid gap-2">
                <FilterDropdown
                    title="Year"
                    filter="year"
                    list={YEAR_LIST}
                    selected={filters.year}
                    setFilters={setFilters}
                    onChangeFilter={onChangeFilter}
                />
                <FilterDropdown
                    title="Status"
                    filter="status"
                    list={STATUS_LIST}
                    selected={filters.status}
                    setFilters={setFilters}
                    onChangeFilter={onChangeFilter}
                />
            </div>
        </div>
    )
}
