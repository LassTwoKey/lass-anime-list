import { gql } from '@apollo/client'

export const GET_MANGA = gql`
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
