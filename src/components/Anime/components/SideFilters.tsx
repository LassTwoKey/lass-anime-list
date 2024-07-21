import { FC } from 'react'
import { Filter } from './Filter'
import {
    YEAR_LIST,
    STATUS_LIST,
    SEASON_LIST,
    GENRE_LIST,
} from '../static/filters'
import { cn } from '@/lib/utils'
import { AllFilters, NameFilter, FilterValue } from '@/types'
import { MultiSelectFilter } from './MultiSelectFilter'

interface SideFiltersProps {
    className: string
    title: string
    filters: AllFilters
    setFilters: React.Dispatch<React.SetStateAction<AllFilters>>
}

export const SideFilters: FC<SideFiltersProps> = (props) => {
    const { className, title, filters, setFilters } = props

    const setCurrentFilter = (name: NameFilter, value: FilterValue) => {
        if (typeof value === 'string') {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }))
        }

        if (Array.isArray(value)) {
            setFilters((prev) => ({
                ...prev,
                [name]: value.length === 0 ? null : value,
            }))
        }
    }
    const removeCurrentFilter = (name: NameFilter) => {
        if (!filters[name]) return

        setFilters((prev) => ({
            ...prev,
            [name]: null,
        }))
    }

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <h3 className="text-white font-medium text-xl mb-2">{title}</h3>

            <Filter
                title="Year"
                name="year"
                value={filters['year']}
                list={YEAR_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />
            <Filter
                title="Status"
                name="status"
                value={filters['status']}
                list={STATUS_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />
            <Filter
                title="Season"
                name="season"
                value={filters['season']}
                list={SEASON_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />
            <MultiSelectFilter
                title="Genres"
                name="genres"
                value={filters['genres']}
                list={GENRE_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />
        </div>
    )
}
