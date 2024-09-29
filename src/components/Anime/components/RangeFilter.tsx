import { FC, useEffect, useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'
import { FilterValue, NameFilter } from '@/types'

interface RangeFilterProps {
    title: string
    names: NameFilter[]
    range: [number, number]
    filterValue: [FilterValue, FilterValue]
    setCurrentFilter: (name: NameFilter, value: FilterValue) => void
    removeCurrentFilter: (name: NameFilter) => void
    setCustomValues?: (value: number[]) => [unknown, unknown]
    revertCustomValues?: (value: string[]) => [number, number]
}

export const RangeFilter: FC<RangeFilterProps> = (props) => {
    const {
        title,
        names,
        range,
        filterValue,
        setCurrentFilter,
        removeCurrentFilter,
        setCustomValues,
        revertCustomValues,
    } = props
    const [value, setValue] = useState<[number, number]>(range)

    const changeValueHandler = (value: [number, number]) => {
        setValue(value)
    }

    const commitValueHandler = (value: [number, number]) => {
        let rangeValues: [number, number] | [unknown, unknown] = value
        if (setCustomValues) {
            rangeValues = setCustomValues(value)
        }

        if (value[0] == range[0] && value[1] == range[1]) {
            setCurrentFilter(names[0], `${rangeValues[0]}` as FilterValue)
            setCurrentFilter(names[1], `${rangeValues[1]}` as FilterValue)

            removeCurrentFilter(names[0])
            removeCurrentFilter(names[1])
            return
        }

        setCurrentFilter(names[0], `${rangeValues[0]}` as FilterValue)
        setCurrentFilter(names[1], `${rangeValues[1]}` as FilterValue)
    }

    const clearRange = () => {
        setValue(range)
        removeCurrentFilter(names[0])
        removeCurrentFilter(names[1])
    }

    useEffect(() => {
        if (filterValue[0] && filterValue[1]) {
            if (revertCustomValues) {
                setValue(
                    revertCustomValues([
                        filterValue[0] as string,
                        filterValue[1] as string,
                    ])
                )
            } else {
                setValue([filterValue[0] as number, filterValue[1] as number])
            }
        }
    }, [filterValue[0], filterValue[1]])

    const isDefaultValue = value[0] == range[0] && value[1] == range[1]

    return (
        <div>
            <div className="flex gap-2 justify-between items-center">
                <p className="text-white font-medium mb-2">{title}</p>
                {!isDefaultValue && (
                    <p className="flex gap-1 items-center text-gray-400">
                        <span className="text-sm">
                            {value[0]} - {value[1]}
                        </span>
                        <X
                            className="inline-flex h-full cursor-pointer hover:text-gray-500 duration-200"
                            size={16}
                            onClick={clearRange}
                        />
                    </p>
                )}
            </div>
            <Slider
                min={range[0]}
                max={range[1]}
                defaultValue={range}
                onValueChange={changeValueHandler}
                onValueCommit={commitValueHandler}
                value={value}
                step={1}
                isRange={true}
            />
        </div>
    )
}
