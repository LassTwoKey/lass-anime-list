import { gql } from '@apollo/client'

export const GET_CHARACTER = gql`
    query GetCharacter($id: Int) {
        Character(id: $id) {
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
        }
    }
`
