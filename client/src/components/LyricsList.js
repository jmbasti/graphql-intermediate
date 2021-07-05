import React from "react";
import { useQuery } from "@apollo/client";
import { SONG_LIST_QUERY } from "../queries";

const LyricsList = ({ id }) => {
  const { data, loading, error } = useQuery(SONG_LIST_QUERY, {
    variables: { id: id },
  });
  const lyrics = data?.song?.lyrics;
  return (
    <ul>
      {lyrics.map((lyric, index) => (
        <li key={index}>{lyric?.content}</li>
      ))}
    </ul>
  );
};

export default LyricsList;
