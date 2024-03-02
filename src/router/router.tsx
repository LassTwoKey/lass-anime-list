import { createBrowserRouter } from "react-router-dom";

import { Main } from "@/pages/Main";
import { Anime } from "@/pages/Anime";
import { Manga } from "@/pages/Manga";
import { AnimeDetails } from "@/pages/AnimeDetails";
import { MangaDetails } from "@/pages/MangaDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/anime",
    element: <Anime />,
  },
  {
    path: "/anime/:animeId",
    element: <AnimeDetails />
  },
  {
    path: "/manga",
    element: <Manga />
  },
  {
    path: "/manga/:mangaId",
    element: <MangaDetails />
  },
]);
