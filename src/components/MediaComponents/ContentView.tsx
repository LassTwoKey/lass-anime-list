import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ListType } from '@/types'
import { Grid2X2, Grid3X3, TableProperties } from 'lucide-react'

interface ContentViewProps {
    setViewType: React.Dispatch<React.SetStateAction<ListType>>
}

export const ContentView: FC<ContentViewProps> = (props) => {
    const { setViewType } = props

    const currentType = (localStorage.getItem('animeType') ??
        'chart') as ListType
    const [type, setType] = useState(currentType)

    const selectCoverHanlder = () => {
        setViewType('cover')
        setType('cover')
        localStorage.setItem('animeType', 'cover')
    }
    const selectChartHanlder = () => {
        setViewType('chart')
        setType('chart')
        localStorage.setItem('animeType', 'chart')
    }
    const selectTableHanlder = () => {
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
                onClick={selectCoverHanlder}
            >
                <Grid3X3 />
            </Button>
            <Button
                className={cn(
                    'hidden md:inline-block px-2 hover:text-gray-300',
                    type === 'chart' && 'text-white'
                )}
                variant="transparent"
                onClick={selectChartHanlder}
            >
                <Grid2X2 />
            </Button>
            <Button
                className={cn(
                    'px-2 hover:text-gray-300',
                    type === 'table' && 'text-white'
                )}
                variant="transparent"
                onClick={selectTableHanlder}
            >
                <TableProperties />
            </Button>
        </div>
    )
}
