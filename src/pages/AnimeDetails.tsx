import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { PageWrapper } from "@/ui/PageWrapper";

const GET_ANIME = gql`
  query GetAnime($id: Int){
    Media(id: $id, type: ANIME) {
      bannerImage
    }
  }
`;

export const AnimeDetails = () => {
  let {animeId} = useParams();  

  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: {
      id: animeId,
    },
  });

  if (loading) return (
    <PageWrapper>
      <div>Loading...</div>
    </PageWrapper>
  );
  if (error) return ( <PageWrapper>
      <div>Error in loading data :(</div>
    </PageWrapper>
  )
  
  return (
    <PageWrapper>
      <img src={data.Media.bannerImage} alt="" />
    </PageWrapper>
  )
}
