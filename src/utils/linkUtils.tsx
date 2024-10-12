import { Link } from 'react-router-dom'
import parse, { domToReact } from 'html-react-parser'
import type {
    HTMLReactParserOptions,
    Element,
    DOMNode,
} from 'html-react-parser'
import { StyledLink } from '@/ui/StyledLink'

interface ValueObject {
    season?: string
    year?: number
    studioId?: number
    genres?: string[]
    characters?: { id: number; content: string }[]
    mediaType?: string
}

export const getFilterLink = (
    value: string,
    filterName: string,
    values?: ValueObject
) => {
    switch (filterName) {
        case 'type':
            return <StyledLink
                to={`/${values?.mediaType}`}
                className="text-green-100 hover:text-green-300"
            >{value}</StyledLink>
        case 'status':
            return (
                <StyledLink
                    to={`/${values?.mediaType}?status=${value.toUpperCase()}`}
                    className="text-green-100 hover:text-green-300"
                >
                    {value}
                </StyledLink>
            )
        case 'season':
            return (
                <StyledLink
                    to={`/${values?.mediaType}?season=${values?.season}&year=${values?.year}%`}
                    className="text-green-100 hover:text-green-300"
                >
                    {value}
                </StyledLink>
            )
        case 'studio':
            if (!value) return ''
            return (
                <StyledLink
                    to={
                        values?.mediaType === 'anime'
                            ? `/studio/${values?.studioId}/${value}`
                            : ''
                    }
                    className="text-green-100 hover:text-green-300"
                >
                    {value}
                </StyledLink>
            )
        case 'genres':
            return values?.genres?.map((genre, index) => (
                <span key={genre}>
                    <StyledLink
                        to={`/${values?.mediaType}?genres=${genre}`}
                        className="text-green-100 hover:text-green-300"
                    >
                        {genre}
                    </StyledLink>
                    {values.genres?.length &&
                    values.genres?.length - 1 !== index
                        ? ', '
                        : ''}
                </span>
            ))
        case 'characters':
            return values?.characters?.map((character, index) => (
                <span key={character.id}>
                    <StyledLink
                        to={`/character/${character.id}`}
                        className="text-green-100 hover:text-green-300"
                    >
                        {character.content}
                    </StyledLink>
                    {values.characters?.length &&
                    values.characters?.length - 1 !== index
                        ? ', '
                        : ''}
                </span>
            ))
        case 'format':
            return (
                <StyledLink
                    to={`/${values?.mediaType}?format=${value.toUpperCase()}`}
                    className="text-green-100 hover:text-green-300"
                >
                    {value}
                </StyledLink>
            )
        case 'year':
            return (
                <StyledLink
                    to={`/${values?.mediaType}?year=${value}%`}
                    className="text-green-100 hover:text-green-300"
                >
                    {value}
                </StyledLink>
            )
        default:
            return ''
    }
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
