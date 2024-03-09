import { Character, Stuff } from '@/types'

export interface StudiosEdge {
    node: {
        name: string
        isAnimationStudio: boolean
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
