import { createBrowserRouter } from 'react-router-dom'

import { Main } from '@/pages/Main'
import { Anime } from '@/pages/Anime'
import { Manga } from '@/pages/Manga'
import { AnimeDetails } from '@/pages/AnimeDetails'
import { MangaDetails } from '@/pages/MangaDetails'
import { CharacterDetails } from '@/pages/CharacterDetails'

const routes = [
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/anime',
        element: <Anime />,
    },
    {
        path: '/anime/:mediaId',
        element: <AnimeDetails />,
    },
    {
        path: '/manga',
        element: <Manga />,
    },
    {
        path: '/manga/:mediaId',
        element: <MangaDetails />,
    },
    {
        path: '/character/:characterId',
        element: <CharacterDetails />,
    },
]

export const router = createBrowserRouter(routes, {
    basename: '/',
})
