import {gql} from "@apollo/client";

export const GET_MEDIA_LIST = gql`
    query CurrentSeasonList(
        $page: Int
        $perPage: Int
        $sort: [MediaSort]
        $type: MediaType
        $search: String
    ) {
        Page(page: $page, perPage: $perPage) {
            media(sort: $sort, type: $type, search: $search) {
                id
                title {
                    romaji
                    native
                }
                coverImage {
                    large
                }
                meanScore
                type
                format
                startDate {
                    year
                }
            }
        }
    }
`