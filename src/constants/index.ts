import { isProd } from '@/utils'

export const baseUrl = isProd
    ? 'https://lass-anime-list.vercel.app'
    : 'http://localhost:5173'
