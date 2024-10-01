import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GoBackProps {
    isNoOffset?: boolean
}

export const GoBack: FC<GoBackProps> = (props) => {
    const { isNoOffset } = props

    const navigate = useNavigate()
    const isGoBack = window.history.state && window.history.state.idx > 0
    const handleGoBack = () => {
        if (isGoBack) {
            navigate(-1)
        }
    }

    return (
        <>
            {isGoBack && (
                <div
                    className={cn(
                        'absolute left-0 flex items-center h-8 md:h-12 z-10 w-28 bg-gradient-to-r from-neutral-900 opacity-95',
                        !isNoOffset && 'top-12'
                    )}
                >
                    <span
                        className="flex gap-1 h-full items-center cursor-pointer text-gray-400"
                        onClick={handleGoBack}
                    >
                        <ChevronLeft className="translate-y-0.5" size={18} />{' '}
                        Back
                    </span>
                </div>
            )}
        </>
    )
}
