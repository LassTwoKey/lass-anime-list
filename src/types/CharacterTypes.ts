export interface Character {
    id: number
    name: {
        userPreferred: string
        native: string
    }
    image: {
        medium: string
        large: string
    }
    description: string
    gender: string
    age: string
    dateOfBirth: {
        year: number
        month: number
        day: number
    }
}
