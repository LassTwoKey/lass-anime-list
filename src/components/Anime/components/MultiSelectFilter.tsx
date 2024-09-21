import { FC, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NameFilter, Filter, FilterValue } from '@/types'

interface MultiSelectFilterProps {
    title: string
    name: NameFilter
    list: Filter[]
    value: string[] | null
    setCurrentFilter: (name: NameFilter, value: FilterValue) => void
    removeCurrentFilter: (name: NameFilter) => void
}

export const MultiSelectFilter: FC<MultiSelectFilterProps> = (props) => {
    const { title, list, name, value, setCurrentFilter, removeCurrentFilter } =
        props

    const triggerRef = useRef<HTMLButtonElement>(null)

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
        undefined
    )
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Filter[]>([])

    const setCurrentFilterHandle = (newList: Filter[]) => {
        clearTimeout(timeoutId)

        setTimeoutId(
            setTimeout(function () {
                setCurrentFilter(
                    name,
                    newList.map((x) => x.id)
                )
            }, 1000)
        )
    }

    const selectHandler = (item: Filter) => {
        const isFinded = !!selected.find((x) => x.id === item.id)

        if (!isFinded) {
            let newList: Filter[] = []
            setSelected((prev) => {
                newList = [...prev, item]
                return [...prev, item]
            })

            setCurrentFilterHandle(newList)
        } else {
            let newList: Filter[] = []
            setSelected((prev) => {
                const filteredList = prev.filter(
                    (selectedItem) => selectedItem.id !== item.id
                )
                newList = filteredList
                return filteredList
            })

            setCurrentFilterHandle(newList)
        }
    }

    const isChecked = (item: Filter) => {
        return !!selected.find((x) => x.id === item.id)
    }

    const selectedNames = selected.map((item) => item.name).join(', ')

    useEffect(() => {
        setSelected(list.filter((item) => value?.includes(item.id)))
    }, [value])

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    ref={triggerRef}
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex justify-between px-3"
                    variant="outline"
                >
                    <span className="overflow-hidden text-ellipsis">
                        {!selected.length && title}
                        {!!selected.length && selectedNames}
                    </span>
                    <ChevronDown className="h-4 flex-shrink-0 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={() => setOpen(false)}
                align="start"
                className="border-gray-400 border p-0 bg-zinc-800 overflow-hidden"
                style={{
                    width: triggerRef.current?.offsetWidth,
                }}
            >
                <ScrollArea className="h-[320px]">
                    <ul>
                        {list.map((item) => (
                            <li key={item.id}>
                                <Button
                                    variant="transparent"
                                    className="hover:bg-[#22c55e66] flex justify-start px-3 w-full hover:text-white"
                                    onClick={() => selectHandler(item)}
                                >
                                    <Checkbox
                                        className="mr-3"
                                        checked={isChecked(item)}
                                    />
                                    <span className="whitespace-nowrap"></span>
                                    {item.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                <div className="mx-1 mb-1 mt-2">
                    <Button
                        className="w-full px-2"
                        variant="red"
                        size="sm"
                        onClick={() => {
                            setOpen(false)
                            setSelected([])
                            removeCurrentFilter(name)
                            clearTimeout(timeoutId)
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
