import { gql, useQuery } from '@apollo/client';

import { PageWrapper } from '@/ui/PageWrapper'
import { CurrentSeasonList } from '@/components/CurrentSeasonList'

const GET_CURRENT_SEASON_LIST = gql`
  query CurrentSeasonList($page: Int, $perPage: Int, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      media(seasonYear: $seasonYear, type: ANIME, status: RELEASING) {
        id
        title {
          romaji
          native
        }
        coverImage {
          large
        }
        meanScore
      }
    }
  }
`;

export const Main = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_SEASON_LIST, {
    variables: {
      page: 1,
      perPage: 10,
      seasonYear: 2024,
    },
  });

  if (loading) return (
    <PageWrapper>
      <div>Loading...</div>
    </PageWrapper>
  );
  if (error) return (
    <PageWrapper>
      <div>Error in loading data :(</div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      <div className="bg-neutral-900 pt-24 pb-12">
        <div className='container mx-auto px-4'>
          <h1 className='font-medium text-3xl text-white mb-4'>Welcome to Lass Anime List</h1>
          <p className='text-white'>Here you can find information about various manga and anime based on on The AniList GraphQL Api. Powerful access to over 500k anime and manga entries, including character, staff, and live airing data.</p>
        </div>
      </div>

      <div className="py-4">
        <div className='container mx-auto px-4'>
          <h1 className='font-medium text-3xl text-white mb-6'>Winter Season Anime</h1>
          <CurrentSeasonList list={data.Page.media} />
        </div>
      </div>
    </PageWrapper>
  )
}
