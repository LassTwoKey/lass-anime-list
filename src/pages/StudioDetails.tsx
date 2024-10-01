import { useParams } from 'react-router-dom'
import { PageWrapper } from '@/ui/PageWrapper'
import { gql, useQuery } from '@apollo/client'
import { ErrorBlock } from '@/ui/ErrorBlock'
import { NonPersonalDetails } from '@/components/PersonalDetails/NonPersonalDetails'

const GET_STUDIO = gql`
    query GetStudio($id: Int) {
        Studio(id: $id) {
            id
            name
            media {
                edges {
                    node {
                        id
                        type
                        title {
                            romaji
                            native
                        }
                        coverImage {
                            large
                        }
                        meanScore
                    }
                }
            }
        }
    }
`

export const StudioDetails = () => {
    const { studioId } = useParams()

    const { loading, error, data } = useQuery(GET_STUDIO, {
        variables: {
            id: studioId,
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

    const list = data.Studio.media.edges.map(
        (item: { node: { id: number } }) => ({
            ...item.node,
            // Уникализация для повторяющийся id
            uniqueId: Math.random() * Math.random(),
        })
    )
    const studioName = data.Studio.name as string

    return (
        <PageWrapper>
            <NonPersonalDetails name={studioName} list={list} />
        </PageWrapper>
    )
}
