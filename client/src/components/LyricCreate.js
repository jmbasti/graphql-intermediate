import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LYRIC } from "../mutations";
import { SONG_LIST_QUERY } from "./../queries/index";

const LyricCreate = ({ id }) => {
  const [lyric, setLyric] = useState("");
  const { refetch } = useQuery(SONG_LIST_QUERY, {
    variables: { id: id },
  });
  const [addLyricToSong] = useMutation(ADD_LYRIC);

  const handleSubmit = () => {
    addLyricToSong({
      variables: { content: lyric, songId: id },
    });
    setLyric("");
    refetch();
  };
  return (
    <div className="container">
      <input
        value={lyric}
        onChange={(e) => setLyric(e.target.value)}
        placeholder="Add Lyric..."
      />
      <button className="btn btn-info" onClick={handleSubmit}>
        Add Lyric
      </button>
    </div>
  );
};

export default LyricCreate;
