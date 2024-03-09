import { StuffEdge } from '@/types'
import { getStringSeparatedByCommas } from '@/utils'
import { gql, useQuery } from '@apollo/client'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const GET_STUFF = gql`
    query GetStuff($id: Int, $type: MediaType) {
        Media(id: $id, type: $type) {
            staff {
                edges {
                    id
                    node {
                        name {
                            userPreferred
                        }
                        image {
                            medium
                        }
                        primaryOccupations
                    }
                }
            }
        }
    }
`

interface StuffProps {
    type: 'ANIME' | 'MANGA'
}

export const Stuff: FC<StuffProps> = (props) => {
    const { type } = props
    const { mediaId } = useParams()

    const { loading, error, data } = useQuery(GET_STUFF, {
        variables: {
            id: mediaId,
            type,
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

    const stuffList: StuffEdge[] = data.Media.staff.edges

    return (
        <div className="grid grid-cols-2 gap-6">
            {stuffList.map((employee) => (
                <div
                    key={employee.id}
                    className="flex bg-neutral-900 rounded-lg overflow-hidden h-24"
                >
                    <img
                        className="flex object-cover w-16"
                        src={employee.node.image.medium}
                        alt=""
                    />
                    <div className="p-4 flex flex-col justify-between">
                        <h3 className="text-white">
                            {employee.node.name.userPreferred}
                        </h3>
                        <p>
                            {getStringSeparatedByCommas(
                                employee.node.primaryOccupations
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
