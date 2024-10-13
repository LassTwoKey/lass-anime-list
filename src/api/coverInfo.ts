import {gql} from "@apollo/client";

export const GET_ANIME_INFO = gql`
    query GetItemInfo($id: Int) {
        Media(id: $id) {
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
        }
    }
`
export const GET_MANGA_INFO = gql`
    query GetItemInfo($id: Int) {
        Media(id: $id) {
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
        }
    }
`