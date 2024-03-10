import { FC } from 'react'
import { ChartItemsList } from './components/ChartItemsList'
import { ChartItem } from '@/types'

interface ComplexContentListProps {
    list: ChartItem[]
    type: 'cover' | 'chart' | 'table'
}

export const ComplexContentList: FC<ComplexContentListProps> = (props) => {
    const { list, type } = props

    // const isCover = type === 'cover'
    const isChart = type === 'chart'
    // const isTable = type === 'table'

    return <>{isChart && <ChartItemsList list={list} />}</>
}
