import { FC } from 'react'
import { ContentView } from './ContentView'
import { Filter } from './Filter'
import { SORT_BY_LIST } from '../static/filters'
import { NameFilter, AllFilters, FilterValue, ListType } from '@/types'

interface ActionsProps {
    filters: AllFilters
    setType: React.Dispatch<React.SetStateAction<ListType>>
    setFilters: React.Dispatch<React.SetStateAction<AllFilters>>
}

export const Actions: FC<ActionsProps> = (props) => {
    const { filters, setType, setFilters } = props

    const setCurrentFilter = (name: NameFilter, value: FilterValue) => {
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
        <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
                <p className="font-medium whitespace-nowrap text-gray-400">
                    Sort by:
                </p>
                <Filter
                    title="None"
                    name="sort"
                    value={filters['sort']}
                    list={SORT_BY_LIST}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />
            </div>
            <ContentView setViewType={setType} />
        </div>
    )
}
