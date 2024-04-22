import { FC } from 'react'
import { ChartItemsList } from './components/ChartItemsList'
import { CoverItemsList } from './components/CoverItemsList'
import { TableItemsList } from './components/TableItemsList'
import { ChartItem, ListType } from '@/types'

interface ComplexContentListProps {
    list: ChartItem[]
    type: ListType
    fetchData?: () => unknown
}

export const ComplexContentList: FC<ComplexContentListProps> = (props) => {
    const { list, type, fetchData } = props

    const isCover = type === 'cover'
    const isChart = type === 'chart'
    const isTable = type === 'table'

    return (
        <>
            {isCover && <CoverItemsList list={list} fetchData={fetchData} />}
            {isChart && <ChartItemsList list={list} fetchData={fetchData} />}
            {isTable && <TableItemsList list={list} fetchData={fetchData} />}
        </>
    )
}
