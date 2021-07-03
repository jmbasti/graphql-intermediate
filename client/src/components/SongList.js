import React from "react";
import { useQuery, gql } from "@apollo/client";

const SONGS_LIST_QUERY = gql`
  query GetSongs {
    songs {
      title
    }
  }
`;

const SongList = () => {
  const { data, loading, error } = useQuery(SONGS_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.songs.map(({ title }, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
};

export default SongList;
