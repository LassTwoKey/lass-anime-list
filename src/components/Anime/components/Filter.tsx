import { FC, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface FilterProps {
    title: string
    name: string
    list: {
        id: string | number
        name: string | number
    }[]
    value: string | null
    setCurrentFilter: (name: string, value: string) => void
    removeCurrentFilter: (name: string) => void
}

export const Filter: FC<FilterProps> = (props) => {
    const { title, list, name, value, setCurrentFilter, removeCurrentFilter } =
        props

    const [key, setKey] = useState(+new Date())

    return (
        <Select
            key={key}
            onValueChange={(value) => setCurrentFilter(name, value)}
            value={value || ''}
            defaultValue={value || ''}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent
                ref={(ref) =>
                    ref?.addEventListener('touchend', (e) => e.preventDefault())
                }
            >
                {list.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                ))}
                <Button
                    className="w-full px-2 mt-2"
                    variant="red"
                    size="sm"
                    onClick={() => {
                        removeCurrentFilter(name)
                        setKey(+new Date())
                    }}
                >
                    Clear
                </Button>
            </SelectContent>
        </Select>
    )
}
