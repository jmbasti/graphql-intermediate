import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { SONGS_LIST_QUERY } from "./../queries";
import { DELETE_SONG } from "../mutations";

const SongList = () => {
  const history = useHistory();
  const { data, loading, error, refetch } = useQuery(SONGS_LIST_QUERY);
  const [deleteSong] = useMutation(DELETE_SONG);
  const handleDeleteSong = (id) => {
    deleteSong({
      variables: { id: id },
    });
    refetch();
  };

  const handleSongDetail = (id) => {
    history.push(`/song/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <ul className="collection">
        {data.songs.map(({ title, id }, index) => (
          <div
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <li
              onClick={() => handleSongDetail(id)}
              className="collection-item"
            >
              {title}
            </li>
            <i onClick={() => handleDeleteSong(id)} className="material-icons">
              delete
            </i>
          </div>
        ))}
      </ul>
      <Link className="btn-floating btn-large red right" to="/create">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
