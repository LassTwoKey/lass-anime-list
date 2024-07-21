import { gql } from '@apollo/client'

export const GET_MEDIA_LIST = gql`
    query CurrentSeasonList(
        $page: Int
        $perPage: Int
        $type: MediaType
        $sort: [MediaSort]
        $status: MediaStatus
        $year: String
        $season: MediaSeason
        $genres: [String]
    ) {
        Page(page: $page, perPage: $perPage) {
            media(
                sort: $sort
                type: $type
                status: $status
                startDate_like: $year
                season: $season
                genre_in: $genres
            ) {
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
                startDate {
                    year
                }
            }
        }
    }
`
