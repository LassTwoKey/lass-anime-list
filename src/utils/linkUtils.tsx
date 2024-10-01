import { Link } from 'react-router-dom'
import parse, { domToReact } from 'html-react-parser'
import type {
    HTMLReactParserOptions,
    Element,
    DOMNode,
} from 'html-react-parser'
import { StyledLink } from '@/ui/StyledLink'

export const createJsxLinks = (
    arr: { id: number | string; content: string }[],
    url: string
) => {
    return (
        <>
            {arr.map((item, index) => (
                <span key={item.id}>
                    <StyledLink to={`${url}/${item.id}`}>
                        {item.content}
                    </StyledLink>
                    {arr.length - 1 !== index ? ', ' : ''}
                </span>
            ))}
        </>
    )
}

export const parseWithLinks = (
    text: string,
    originalStr?: string,
    replacementStr: string = ''
) => {
    let editedText = text

    if (originalStr) {
        const regex = new RegExp(originalStr, 'g')
        editedText = text.replace(regex, replacementStr)
    }

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (
                domNode.type === 'tag' &&
                (domNode as Element).name === 'a' &&
                (domNode as Element).attribs.href
            ) {
                const { href } = (domNode as Element).attribs
                const children = (domNode as Element).children as DOMNode[]
                return <Link to={href}>{domToReact(children, options)}</Link>
            }
        },
    }

    return parse(editedText, options)
}
