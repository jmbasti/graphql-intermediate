import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SONGS_LIST_QUERY } from "./../queries/index";
import { ADD_SONG } from "./../mutations";

const SongCreate = () => {
  const [song, setSong] = useState("");
  const history = useHistory();
  const [addSong] = useMutation(ADD_SONG, {
    update(cache, { data }) {
      const newSongFromResponse = data?.addSong;
      const existingSongs = cache.readQuery({
        query: SONGS_LIST_QUERY,
      });

      if (existingSongs && newSongFromResponse) {
        cache.writeQuery({
          query: SONGS_LIST_QUERY,
          data: {
            songs: [...existingSongs.songs, newSongFromResponse],
          },
        });
      }
    },
  });

  const handleSubmit = () => {
    addSong({
      variables: { title: song },
    });
    setSong("");
  };

  return (
    <div className="container">
      <Link to="/">Back</Link>
      <input
        value={song}
        onChange={(e) => setSong(e.target.value)}
        placeholder="Create song..."
      />
      <button className="btn btn-info" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SongCreate;
