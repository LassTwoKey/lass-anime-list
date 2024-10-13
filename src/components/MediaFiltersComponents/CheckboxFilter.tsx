import { FC, useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterValue, NameFilter } from '@/types'

interface CheckboxFilterProps {
    title: string
    name: NameFilter
    value: boolean | null
    setCurrentFilter: (name: NameFilter, value: FilterValue) => void
    removeCurrentFilter: (name: NameFilter) => void
}

export const CheckboxFilter: FC<CheckboxFilterProps> = (props) => {
    const { title, name, value, setCurrentFilter } = props
    const [checked, setChecked] = useState(value as boolean)

    const checkedChangeHandler = (val: boolean) => {
        setCurrentFilter(name, val)
    }

    useEffect(() => {
        setChecked(value as boolean)
    }, [value])

    return (
        <div className="flex gap-2 items-center my-4">
            <Checkbox
                id="adult-only"
                checked={checked}
                defaultChecked={checked}
                onCheckedChange={checkedChangeHandler}
            />
            <label
                className="text-gray-400 text-sm font-medium cursor-pointer"
                htmlFor="adult-only"
            >
                {title}
            </label>
        </div>
    )
}
