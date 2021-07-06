import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SONG_LIST_QUERY } from "../queries";
import { LIKE_LYRIC } from "../mutations";

const LyricsList = ({ id }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);
  const { data, loading, error } = useQuery(SONG_LIST_QUERY, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const lyrics = data?.song?.lyrics;

  console.log(lyrics);

  const handleLike = (id, likes) => {
    likeLyric({
      variables: { id: id },
      // Optimistic UI
      optimisticResponse: {
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  };
  return (
    <ul>
      {lyrics.map((lyric, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {lyric?.content}
          <div
            className="vote-box"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <i
              className="material-icons"
              onClick={() => handleLike(lyric.id, lyric.likes)}
              style={{ cursor: "pointer", marginRight: 5 }}
            >
              thumb_up
            </i>
            {lyric.likes}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LyricsList;
