export interface StaffMediaItem {
    id: number
    type: 'MANGA' | 'ANIME'
    title: {
        romaji: string
    }
    coverImage: {
        large: string
    }
    staffRole: string
    meanScore: number
}

export interface Staff {
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
    dateOfDeath: {
        year: number
        month: number
        day: number
    }
    bloodType: string
    homeTown: string
    yearsActive: number[]
    primaryOccupations: string[]
}
