import { Character, Stuff } from '@/types'

export interface StudiosEdge {
    node: {
        name: string
        id: number
    }
}

export interface CharactersEdge {
    id: number
    role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND'
    node: Character
}

export interface StuffEdge {
    id: number
    node: Stuff
}
