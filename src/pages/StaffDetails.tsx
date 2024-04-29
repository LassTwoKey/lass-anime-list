import { ErrorBlock } from '@/ui/ErrorBlock'
import { PageWrapper } from '@/ui/PageWrapper'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PersonalDetails } from '@/components/PersonalDetails/PersonalDetails'

const GET_STAFF = gql`
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

export const StaffDetails = () => {
    const { staffId } = useParams()

    const { loading, error, data } = useQuery(GET_STAFF, {
        variables: {
            id: staffId,
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

    type Item = { node: { id: number }; staffRole: string }
    const list = data.Staff.staffMedia.edges.map((item: Item) => ({
        ...item.node,
        // Уникализация для повторяющийся id
        uniqueId: Math.random() * Math.random(),
        staffRole: item.staffRole,
    }))

    return (
        <PageWrapper>
            <PersonalDetails list={list} info={data?.Staff} />
        </PageWrapper>
    )
}
