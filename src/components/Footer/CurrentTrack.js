import React, { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import styles from "./CurrentTrack.module.css";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";

function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  // console.log(currentlyPlaying);

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <div className={styles["current-track-container"]}>
      {currentlyPlaying && (
        <div className={styles["track"]}>
          <div className={styles["track-image"]}>
            <img src={currentlyPlaying.image} alt={currentlyPlaying.name} />
          </div>
          <div className={styles["track-info"]}>
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentTrack;
