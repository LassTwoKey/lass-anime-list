import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Ranking } from '@/types'
import { capitalizeFirstLetter } from '@/utils'
import Icon from '@mdi/react'
import { mdiFire, mdiStar } from '@mdi/js'

const GET_STATS = gql`
    query GetStats($id: Int) {
        Media(id: $id) {
            rankings {
                id
                type
                rank
                context
                season
                year
            }
        }
    }
`

export const Stats = () => {
    const { mediaId } = useParams()

    const { loading, error, data } = useQuery(GET_STATS, {
        variables: {
            id: mediaId,
        },
    })

    if (loading) {
        return (
            <div className="flex justify-center min-h-14 py-24">
                <span className="loader-1"></span>
            </div>
        )
    }
    if (error) return <div>Error in loading data :(</div>

    const rankingList: Ranking[] = data.Media.rankings

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {rankingList.map((ranking) => (
                <div
                    key={ranking.id}
                    className="bg-neutral-900 flex gap-4 p-4 items-center rounded-lg overflow-hidden font-medium text-white"
                >
                    {ranking.type === 'RATED' && (
                        <Icon path={mdiStar} size={1} color="rgb(251 191 36)" />
                    )}
                    {ranking.type === 'POPULAR' && (
                        <Icon path={mdiFire} size={1} color="rgb(225 29 72)" />
                    )}
                    <div className="flex justify-center flex-1">
                        <span>
                            <span className="text-green-500">
                                #{ranking.rank}
                            </span>{' '}
                            {capitalizeFirstLetter(ranking.context)}{' '}
                            {capitalizeFirstLetter(ranking.season || '')}{' '}
                            {ranking.year}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
