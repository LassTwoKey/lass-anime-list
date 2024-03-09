import { CharactersEdge } from '@/types'
import { capitalizeFirstLetter } from '@/utils'
import { gql, useQuery } from '@apollo/client'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const GET_CHARACTERS = gql`
    query GetCharacters($id: Int, $type: MediaType) {
        Media(id: $id, type: $type) {
            characters {
                edges {
                    id
                    role
                    node {
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
        <div className="grid grid-cols-4 gap-6">
            {characterList.map((character) => (
                <div
                    key={character.id}
                    className="flex bg-neutral-900 rounded-lg overflow-hidden h-24"
                >
                    <img
                        className="flex object-cover w-16"
                        src={character.node.image.medium}
                        alt=""
                    />
                    <div className="p-4 flex flex-col justify-between">
                        <h3 className="text-white">
                            {character.node.name.userPreferred}
                        </h3>
                        <p>{capitalizeFirstLetter(character.role)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
