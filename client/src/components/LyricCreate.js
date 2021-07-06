import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LYRIC } from "../mutations";
import { SONG_LIST_QUERY } from "./../queries/index";

const LyricCreate = ({ id }) => {
  const [lyric, setLyric] = useState("");
  const [addLyricToSong] = useMutation(ADD_LYRIC, {
    update(cache, { data }) {
      const newLyricFromResponse = data?.addLyricToSong.lyrics;
      const existingLyrics = cache.readQuery({
        query: SONG_LIST_QUERY,
        variables: { id: id },
      });

      console.log(existingLyrics);

      if (existingLyrics && newLyricFromResponse) {
        cache.writeQuery({
          query: SONG_LIST_QUERY,
          variables: { id: id },
          data: {
            lyrics: [...existingLyrics.song.lyrics, newLyricFromResponse],
          },
        });
      }
    },
  });

  const handleSubmit = () => {
    addLyricToSong({
      variables: { content: lyric, songId: id },
    });
    setLyric("");
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
