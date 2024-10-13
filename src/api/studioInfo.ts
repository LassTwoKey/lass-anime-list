import { gql } from '@apollo/client'

export const GET_STUDIO = gql`
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
