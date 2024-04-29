import { ErrorBlock } from '@/ui/ErrorBlock'
import { PageWrapper } from '@/ui/PageWrapper'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PersonalDetails } from '@/components/PersonalDetails/PersonalDetails'

const GET_CHARACTER = gql`
    query GetCharacter($id: Int) {
        Character(id: $id) {
            id
            name {
                native
                userPreferred
            }
            image {
                large
                medium
            }
            description(asHtml: true)
            gender
            age
            dateOfBirth {
                year
                month
                day
            }
        }
    }
`

export const CharacterDetails = () => {
    const { characterId } = useParams()

    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: {
            id: characterId,
        },
    })

    if (loading)
        return (
            <PageWrapper>
                <div className="h-full flex justify-center items-center">
                    <span className="loader-1"></span>
                </div>
            </PageWrapper>
        )
    if (error)
        return (
            <PageWrapper>
                <div className="h-full flex justify-center items-center text-red-500">
                    <ErrorBlock />
                </div>
            </PageWrapper>
        )

    return (
        <PageWrapper>
            <PersonalDetails info={data?.Character} />
        </PageWrapper>
    )
}
