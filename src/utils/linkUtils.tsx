import { Link } from 'react-router-dom'

export const createJsxLinks = (
    arr: { id: number; content: string }[],
    url: string
) => {
    return (
        <>
            {arr.map((item, index) => (
                <Link
                    key={item.id}
                    className="text-green-500 hover:text-green-600 hover:underline duration-150"
                    to={`${url}/${item.id}`}
                >
                    {item.content}
                    {arr.length - 1 !== index ? ', ' : ''}
                </Link>
            ))}
        </>
    )
}
