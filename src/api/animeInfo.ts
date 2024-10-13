import { gql } from '@apollo/client'

export const GET_ANIME = gql`
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
            popularity
            favourites
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
            studios(isMain: true) {
                edges {
                    node {
                        name
                        id
                    }
                }
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
