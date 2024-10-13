import { ErrorBlock } from '@/ui/ErrorBlock'
import { PageWrapper } from '@/ui/PageWrapper'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PersonalDetails } from '@/components/PersonalDetails/PersonalDetails'
import { GET_STAFF } from '@/api/staffInfo.ts'

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
