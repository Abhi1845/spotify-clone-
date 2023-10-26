import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../../utils/Constants";
import { useStateProvider } from "../../utils/StateProvider";
import styles from "./Playlists.module.css";

function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      // console.log(items);
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      // console.log(playlists);
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistID) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistID });
  };

  return (
    <div className={styles["playlist-div"]}>
      <ul className={styles["playlist-ul"]}>
        {playlists.map((eachPlaylist) => (
          <li
            key={eachPlaylist.id}
            onClick={() => changeCurrentPlaylist(eachPlaylist.id)}
          >
            {eachPlaylist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlists;
