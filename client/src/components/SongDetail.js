import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SONG_LIST_QUERY } from "../queries";
import LyricCreate from "./LyricCreate";
import LyricsList from "./LyricsList";

const SongDetail = (props) => {
  //const id = props.match.params.id
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const { data, loading, error, refetch } = useQuery(SONG_LIST_QUERY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Link to="/">Back</Link>
      <p>{data?.song?.title}</p>
      {/* LYRIC LIST */}
      <LyricsList id={id} />
      <LyricCreate id={id} />
    </div>
  );
};

export default SongDetail;
