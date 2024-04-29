import { StuffEdge } from '@/types'
import { getStringSeparatedByCommas } from '@/utils'
import { gql, useQuery } from '@apollo/client'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

const GET_STUFF = gql`
    query GetStuff($id: Int, $type: MediaType) {
        Media(id: $id, type: $type) {
            staff {
                edges {
                    id
                    node {
                        id
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!stuffList.length && (
                <div className="font-medium p-3">No data avaible!</div>
            )}
            {!!stuffList.length &&
                stuffList.map((employee) => (
                    <div
                        key={employee.id}
                        className="flex bg-neutral-900 rounded-lg overflow-hidden h-24"
                    >
                        <Link
                            to={`/staff/${employee.node.id}`}
                            className="flex bg-slate-800 shrink-0 relative w-16 h-24"
                        >
                            <img
                                className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none"
                                src={employee.node.image.medium}
                                alt=""
                            />
                        </Link>
                        <div className="p-4 flex flex-col justify-between">
                            <Link to={`/staff/${employee.node.id}`}>
                                <h3 className="text-white hover:text-green-500 duration-150">
                                    {employee.node.name.userPreferred}
                                </h3>
                            </Link>
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
