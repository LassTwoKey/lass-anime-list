import { FC } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

type Filters = {
    sortBy: null
    year: null
    status: null
}

interface FilterDropdown {
    title: string | number
    filter: 'year' | 'status' | 'sortBy'
    selected: string | number | null
    list: {
        id: string | number
        name: string | number
    }[]
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
    onChangeFilter: () => void
}

export const FilterDropdown: FC<FilterDropdown> = (props) => {
    const { title, list, setFilters, onChangeFilter, filter } = props

    const setCurrentFilter = (value: string | number) => {
        setFilters((prev) => {
            const allFilters = { ...prev }
            allFilters[filter] = value

            onChangeFilter(allFilters)
            console.log(allFilters)

            return allFilters
        })
    }

    // const removeFilter = () => {
    //     setFilters((prev) => {
    //         const allFilters = { ...prev }
    //         allFilters[filter] = null

    //         onChangeFilter(allFilters)

    //         return allFilters
    //     })
    // }

    return (
        <Select onValueChange={setCurrentFilter}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {list.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
