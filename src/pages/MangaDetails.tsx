import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { PageWrapper } from '@/ui/PageWrapper'
import { MediaDetails } from '@/components/MediaDetails/MediaDetails'

const GET_MANGA = gql`
    query GetManga($id: Int) {
        Media(id: $id, type: MANGA) {
            id
            title {
                romaji
                native
            }
            coverImage {
                large
            }
            bannerImage
            meanScore
            type
            genres
            format
            description
            status
            source
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            characters {
                edges {
                    node {
                        name {
                            userPreferred
                        }
                    }
                }
            }
        }
    }
`

export const MangaDetails = () => {
    const { mediaId } = useParams()

    const { loading, error, data } = useQuery(GET_MANGA, {
        variables: {
            id: mediaId,
        },
    })

    if (loading)
        return (
            <PageWrapper>
                <div>Loading...</div>
            </PageWrapper>
        )
    if (error)
        return (
            <PageWrapper>
                <div>Error in loading data :(</div>
            </PageWrapper>
        )

    return (
        <PageWrapper>
            <MediaDetails mediaDetails={data.Media} />
        </PageWrapper>
    )
}
