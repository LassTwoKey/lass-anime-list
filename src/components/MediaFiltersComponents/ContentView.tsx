import { Dispatch, FC, SetStateAction, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ListType } from '@/types'
import { Grid2X2, Grid3X3, TableProperties } from 'lucide-react'

interface ContentViewProps {
    setViewType: Dispatch<SetStateAction<ListType>>
}

export const ContentView: FC<ContentViewProps> = (props) => {
    const { setViewType } = props

    const currentType = (localStorage.getItem('animeType') ??
        'chart') as ListType
    const [type, setType] = useState(currentType)

    const selectCoverHandler = () => {
        setViewType('cover')
        setType('cover')
        localStorage.setItem('animeType', 'cover')
    }
    const selectChartHandler = () => {
        setViewType('chart')
        setType('chart')
        localStorage.setItem('animeType', 'chart')
    }
    const selectTableHandler = () => {
        setViewType('table')
        setType('table')
        localStorage.setItem('animeType', 'table')
    }

    return (
        <div>
            <Button
                className={cn(
                    'px-2 hover:text-gray-300',
                    type === 'cover' && 'text-white'
                )}
                variant="transparent"
                onClick={selectCoverHandler}
            >
                <Grid3X3 />
            </Button>
            <Button
                className={cn(
                    'hidden md:inline-block px-2 hover:text-gray-300',
                    type === 'chart' && 'text-white'
                )}
                variant="transparent"
                onClick={selectChartHandler}
            >
                <Grid2X2 />
            </Button>
            <Button
                className={cn(
                    'px-2 hover:text-gray-300',
                    type === 'table' && 'text-white'
                )}
                variant="transparent"
                onClick={selectTableHandler}
            >
                <TableProperties />
            </Button>
        </div>
    )
}
