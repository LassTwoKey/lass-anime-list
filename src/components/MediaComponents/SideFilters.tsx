import { Dispatch, FC, SetStateAction } from 'react'
import { Filter } from './Filter'
import {
    YEAR_LIST,
    STATUS_LIST,
    SEASON_LIST,
    GENRE_LIST,
    FORMAT_LIST,
    MANGA_FORMAT_LIST,
    YEAR_RANGE,
    EPISODE_RANGE,
    DURATION_RANGE,
    LICENSED_BY_LIST,
    COUNTRY_OF_ORIGIN_LIST,
    SOURCE_LIST,
} from '@/constants/filters'
import { cn } from '@/lib/utils'
import { AllFilters, NameFilter, FilterValue } from '@/types'
import { MultiSelectFilter } from './MultiSelectFilter'
import { Button } from '@/components/ui/button'
import { RangeFilter } from './RangeFilter'
import { CheckboxFilter } from './CheckboxFilter'

interface SideFiltersProps {
    className?: string
    title?: string
    filters: AllFilters
    setFilters: Dispatch<SetStateAction<AllFilters>>
    isAnime: boolean
}

export const SideFilters: FC<SideFiltersProps> = (props) => {
    const { className, title, filters, setFilters, isAnime } = props

    const setCurrentFilter = (name: NameFilter, value: FilterValue) => {
        if (typeof value === 'string') {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }))
        }

        if (typeof value === 'boolean') {
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
    const clearAllFilters = () => {
        // clear all not for sort
        Object.keys(filters)
            .filter((item) => item !== 'sort')
            .forEach((filterName) => {
                const value = filterName as NameFilter
                removeCurrentFilter(value)
            })
    }

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            {!!title && (
                <h3 className="text-white font-medium text-xl">{title}</h3>
            )}

            <Button
                variant="transparent"
                className="text-red-300"
                onClick={clearAllFilters}
            >
                Clear filters
            </Button>

            <MultiSelectFilter
                title="Genres"
                name="genres"
                value={filters['genres']}
                list={GENRE_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />
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
            {isAnime && <Filter
                title="Season"
                name="season"
                value={filters['season']}
                list={SEASON_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />}
            <Filter
                title="Format"
                name="format"
                value={filters['format']}
                list={isAnime ? FORMAT_LIST : MANGA_FORMAT_LIST}
                setCurrentFilter={setCurrentFilter}
                removeCurrentFilter={removeCurrentFilter}
            />

            <h3 className="text-white font-medium text-md my-4">
                Extra filters
            </h3>

            <div className="grid gap-2">
                <Filter
                    title="Country Of Origin"
                    name="countryOfOrigin"
                    value={filters['countryOfOrigin']}
                    list={COUNTRY_OF_ORIGIN_LIST}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />
                {isAnime && <Filter
                    title="Source Material"
                    name="source"
                    value={filters['source']}
                    list={SOURCE_LIST}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />}
                {isAnime && <MultiSelectFilter
                    className="mb-2"
                    title="Streaming on"
                    name="licensedBy"
                    value={filters['licensedBy']}
                    list={LICENSED_BY_LIST}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />}
                <RangeFilter
                    title="Year range"
                    names={['yearGreater', 'yearLesser']}
                    filterValue={[
                        filters['yearGreater'],
                        filters['yearLesser'],
                    ]}
                    range={YEAR_RANGE}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                    setCustomValues={(value: number[]) => {
                        return [`${value[0]}9999`, `${value[1]}0000`]
                    }}
                    revertCustomValues={(value: string[]) => {
                        return [+value[0].slice(0, 4), +value[1].slice(0, 4)]
                    }}
                />
                {isAnime && <RangeFilter
                    title="Episodes"
                    names={['episodeGreater', 'episodeLesser']}
                    filterValue={[
                        filters['episodeGreater'],
                        filters['episodeLesser'],
                    ]}
                    range={EPISODE_RANGE}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />}
                {isAnime && <RangeFilter
                    title="Duration"
                    names={['durationGreater', 'durationLesser']}
                    filterValue={[
                        filters['durationGreater'],
                        filters['durationLesser'],
                    ]}
                    range={DURATION_RANGE}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />}
                <CheckboxFilter
                    title="Adult content"
                    name="isAdult"
                    value={filters['isAdult']}
                    setCurrentFilter={setCurrentFilter}
                    removeCurrentFilter={removeCurrentFilter}
                />
            </div>
        </div>
    )
}
