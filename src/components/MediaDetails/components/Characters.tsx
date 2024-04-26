import { CharactersEdge } from '@/types'
import { capitalizeFirstLetter } from '@/utils'
import { gql, useQuery } from '@apollo/client'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

const GET_CHARACTERS = gql`
    query GetCharacters($id: Int, $type: MediaType) {
        Media(id: $id, type: $type) {
            characters {
                edges {
                    id
                    role
                    node {
                        id
                        name {
                            userPreferred
                        }
                        image {
                            medium
                        }
                    }
                }
            }
        }
    }
`

interface CharactersProps {
    type: 'ANIME' | 'MANGA'
}

export const Characters: FC<CharactersProps> = (props) => {
    const { type } = props
    const { mediaId } = useParams()

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
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

    const characterList: CharactersEdge[] = data.Media.characters.edges

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!characterList.length && (
                <div className="font-medium p-3">No data avaible!</div>
            )}
            {!!characterList.length &&
                characterList.map((character) => (
                    <div
                        key={character.node.id}
                        className="flex bg-neutral-900 rounded-lg overflow-hidden h-24"
                    >
                        <Link
                            to={`/character/${character.node.id}`}
                            className="bg-slate-800 shrink-0 relative w-16 h-24"
                        >
                            <img
                                className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none"
                                src={character.node.image.medium}
                                alt=""
                            />
                        </Link>
                        <div className="p-4 flex flex-col justify-between">
                            <Link to={`/character/${character.node.id}`}>
                                <h3 className="text-white hover:text-green-500 duration-150">
                                    {character.node.name.userPreferred}
                                </h3>
                            </Link>
                            <p>{capitalizeFirstLetter(character.role)}</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}
