import { createBrowserRouter } from 'react-router-dom'

import { Main } from '@/pages/Main'
import { Anime } from '@/pages/Anime'
import { Manga } from '@/pages/Manga'
import { AnimeDetails } from '@/pages/AnimeDetails'
import { MangaDetails } from '@/pages/MangaDetails'
import { CharacterDetails } from '@/pages/CharacterDetails'
import { StaffDetails } from '@/pages/StaffDetails'

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
        path: '/manga',
        element: <Manga />,
    },
    {
        path: '/anime/:mediaId',
        element: <AnimeDetails />,
        children: [
            {
                path: ':animeName',
                element: <AnimeDetails />,
            },
        ],
    },
    {
        path: '/manga/:mediaId',
        element: <MangaDetails />,
        children: [
            {
                path: ':animeName',
                element: <MangaDetails />,
            },
        ],
    },
    {
        path: '/character/:characterId',
        element: <CharacterDetails />,
        children: [
            {
                path: ':characterName',
                element: <CharacterDetails />,
            },
        ],
    },
    {
        path: '/staff/:staffId',
        element: <StaffDetails />,
        children: [
            {
                path: ':staffName',
                element: <StaffDetails />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes, {
    basename: '/',
})
