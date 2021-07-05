import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { SONGS_LIST_QUERY } from "./../queries";
import { DELETE_SONG } from "../mutations";

const SongList = () => {
  const { data, loading, error } = useQuery(SONGS_LIST_QUERY);
  const [deleteSong] = useMutation(DELETE_SONG);
  const handleDeleteSong = (id) => {
    deleteSong({
      variables: { id: id },
      refetchQueries: [{ query: SONGS_LIST_QUERY }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <ul className="collection">
        {data.songs.map(({ title, id }, index) => (
          <li key={id} className="collection-item">
            {title}
            <i onClick={() => handleDeleteSong(id)} className="material-icons">
              delete
            </i>
          </li>
        ))}
      </ul>
      <Link className="btn-floating btn-large red right" to="/create">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
