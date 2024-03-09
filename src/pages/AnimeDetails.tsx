import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { PageWrapper } from '@/ui/PageWrapper'
import { MediaDetails } from '@/components/MediaDetails/MediaDetails'

const GET_ANIME = gql`
    query GetAnime($id: Int) {
        Media(id: $id, type: ANIME) {
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
            episodes
            duration
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
            season
            seasonYear
            studios {
                edges {
                    node {
                        name
                        isAnimationStudio
                    }
                }
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

export const AnimeDetails = () => {
    const { mediaId } = useParams()

    const { loading, error, data } = useQuery(GET_ANIME, {
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
