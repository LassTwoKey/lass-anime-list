import { useState, useEffect } from 'react'
import { GET_MEDIA_LIST } from '../api/api'
import { useLazyQuery } from '@apollo/client'
import { AllFilters, ChartItem } from '@/types'
import { getObjWithoutEmptyValues } from '@/utils'

const useMedia = (filters: AllFilters) => {
    const [page, setPage] = useState(1)
    const [getMediaData, { loading, error, data }] = useLazyQuery(
        GET_MEDIA_LIST,
        {
            fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        }
    )
    const [dataList, setDataList] = useState<ChartItem[]>(
        data?.Page?.media ?? []
    )

    const fetchData = async () => {
        const filtersToServer = getObjWithoutEmptyValues(filters)

        await getMediaData({
            variables: {
                page: page + 1,
                perPage: 15,
                type: 'ANIME',
                ...filtersToServer,
            },
        })
        setPage((prev) => prev + 1)
    }

    useEffect(() => {
        setDataList([])
        setPage(1)

        const filtersToServer = getObjWithoutEmptyValues(filters)
        getMediaData({
            variables: {
                page: 1,
                perPage: 15,
                type: 'ANIME',
                ...filtersToServer,
            },
        })
    }, [getMediaData, filters])

    useEffect(() => {
        if (data?.Page?.media && !dataList.length) {
            setDataList(data?.Page?.media)
        }
    }, [data, dataList])

    useEffect(() => {
        if (data?.Page?.media) {
            setDataList((prev) => prev.concat(data?.Page?.media))
        }
    }, [page])

    return {
        content: {
            loading,
            error,
            data: dataList,
        },
        fetchData,
    }
}

export default useMedia
