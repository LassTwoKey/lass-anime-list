import { gql } from '@apollo/client'

export const GET_STAFF = gql`
    query GetStaff($id: Int) {
        Staff(id: $id) {
            id
            name {
                native
                userPreferred
            }
            image {
                large
                medium
            }
            description(asHtml: true)
            gender
            age
            dateOfBirth {
                year
                month
                day
            }

            dateOfDeath {
                year
                month
                day
            }
            primaryOccupations
            yearsActive
            homeTown
            bloodType

            staffMedia {
                edges {
                    staffRole
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
