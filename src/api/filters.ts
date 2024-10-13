import { gql } from '@apollo/client'

export const GET_MEDIA_LIST = gql`
    query GetMediaList(
        $page: Int
        $perPage: Int
        $type: MediaType
        $sort: [MediaSort]
        $status: MediaStatus
        $year: String
        $season: MediaSeason
        $genres: [String]
        $format: MediaFormat
        $yearLesser: FuzzyDateInt
        $yearGreater: FuzzyDateInt
        $episodeLesser: Int
        $episodeGreater: Int
        $isAdult: Boolean = false
        $licensedBy: [Int]
        $countryOfOrigin: CountryCode
        $source: MediaSource
        $seasonYear: Int
    ) {
        Page(page: $page, perPage: $perPage) {
            media(
                sort: $sort
                type: $type
                status: $status
                startDate_like: $year
                season: $season
                genre_in: $genres
                format: $format
                startDate_lesser: $yearLesser
                startDate_greater: $yearGreater
                episodes_lesser: $episodeLesser
                episodes_greater: $episodeGreater
                isAdult: $isAdult
                licensedById_in: $licensedBy
                countryOfOrigin: $countryOfOrigin
                source: $source
                seasonYear: $seasonYear
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
