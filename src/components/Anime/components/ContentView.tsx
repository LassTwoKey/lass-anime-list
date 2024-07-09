import { FC, useState } from 'react'
import Icon from '@mdi/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { mdiViewGrid, mdiViewList, mdiViewModule } from '@mdi/js'
import { ListType } from '@/types'

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
                    'px-1 hover:text-gray-300 translate-y-[1px]',
                    type === 'cover' && 'text-white'
                )}
                variant="transparent"
                onClick={selectCoverHanlder}
            >
                <Icon path={mdiViewModule} size={1.55} />
            </Button>
            <Button
                className={cn(
                    'hidden md:inline-block px-1 -translate-y-[5px] hover:text-gray-300',
                    type === 'chart' && 'text-white'
                )}
                variant="transparent"
                onClick={selectChartHanlder}
            >
                <Icon
                    className="translate-x-[1px]"
                    path={mdiViewGrid}
                    size={1.12}
                />
            </Button>
            <Button
                className={cn(
                    'px-1 -translate-y-[1px] hover:text-gray-300',
                    type === 'table' && 'text-white'
                )}
                variant="transparent"
                onClick={selectTableHanlder}
            >
                <Icon path={mdiViewList} size={1.4} />
            </Button>
        </div>
    )
}
