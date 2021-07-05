import { gql } from "@apollo/client";

export const SONGS_LIST_QUERY = gql`
  query GetSongs {
    songs {
      title
      id
    }
  }
`;
