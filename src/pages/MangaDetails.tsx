import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { PageWrapper } from '@/ui/PageWrapper'
import { MediaDetails } from '@/components/MediaDetails/MediaDetails'
import { ErrorBlock } from '@/ui/ErrorBlock'

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
            popularity
            favourites
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
                        id
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
            <MediaDetails mediaDetails={data.Media} />
        </PageWrapper>
    )
}
