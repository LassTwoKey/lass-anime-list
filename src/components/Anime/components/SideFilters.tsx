import { FC } from 'react'
import { Filter } from './Filter'
import { YEAR_LIST, STATUS_LIST } from '../static/filters'
import { cn } from '@/lib/utils'
import { AnimeFilters } from '@/types'

interface SideFiltersProps {
    className: string
    title: string
    filters: AnimeFilters
    setFilters: React.Dispatch<React.SetStateAction<AnimeFilters>>
}

export const SideFilters: FC<SideFiltersProps> = (props) => {
    const { className, title, filters, setFilters } = props

    const setCurrentFilter = (name: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const removeCurrentFilter = (name: string) => {
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
        </div>
    )
}
