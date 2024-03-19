import { FC } from 'react'
import { ChartItemsList } from './components/ChartItemsList'
import { CoverItemsList } from './components/CoverItemsList'
import { TableItemsList } from './components/TableItemsList'
import { ChartItem } from '@/types'

interface ComplexContentListProps {
    list: ChartItem[]
    type: 'cover' | 'chart' | 'table'
}

export const ComplexContentList: FC<ComplexContentListProps> = (props) => {
    const { list, type } = props

    const isCover = type === 'cover'
    const isChart = type === 'chart'
    const isTable = type === 'table'

    return (
        <>
            {isCover && <CoverItemsList list={list} />}
            {isChart && <ChartItemsList list={list} />}
            {isTable && <TableItemsList list={list} />}
        </>
    )
}
