import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export const ADD_LYRIC = gql`
  mutation AddLyric($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
