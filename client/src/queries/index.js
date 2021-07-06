import { gql } from "@apollo/client";

export const SONGS_LIST_QUERY = gql`
  query GetSongs {
    songs {
      title
      id
    }
  }
`;

export const SONG_LIST_QUERY = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      title
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
