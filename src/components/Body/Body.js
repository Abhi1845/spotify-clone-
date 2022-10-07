import React, { useEffect } from "react";
import styles from "./Body.module.css";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";

function Body({ headerBackground }) {
  const [{ token, selectedPlaylistID, selectedPlaylist }, dispatch] =
    useStateProvider();

  const getDuration = (inMs) => {
    const mins = Math.floor(inMs / 60000);
    var secs = ((inMs % 60000) / 1000).toFixed(0);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistID}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: getDuration(track.duration_ms),
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      console.log(selectedPlaylist);
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistID]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      const currentlyPlaying = { id, name, artists, image };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  return (
    <>
      {selectedPlaylist && (
        <>
          <div className={styles["playlist"]}>
            <div className={styles["image"]}>
              <img src={selectedPlaylist.image} alt={selectedPlaylist.name} />
            </div>
            <div className={styles["details"]}>
              <span className={styles["type"]}>PLAYLIST</span>
              <h1 className={styles["title"]}>{selectedPlaylist.name}</h1>
              <p className={styles["description"]}>
                {selectedPlaylist.description}
              </p>
            </div>
          </div>
          <div className={styles["lists"]}>
            <div
              className={`${styles["header-row"]} ${
                headerBackground ? styles.headerNew : styles.headerOld
              }`}
            >
              <div className={styles["col"]}>
                <span>#</span>
              </div>
              <div className={styles["col"]}>
                <span>TITLE</span>
              </div>
              <div className={styles["col"]}>
                <span>ALBUM</span>
              </div>
              <div className={styles["col"]}>
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className={styles["tracks"]}>
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className={styles["song-row"]}
                      key={Math.random()}
                      onClick={() => {
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        );
                      }}
                    >
                      <div className={styles["col"]}>
                        <span>{index + 1}</span>
                      </div>
                      <div className={styles["col-detail"]}>
                        <div className={styles["image"]}>
                          <img src={image} alt="track" />
                        </div>
                        <div className={styles["song-details"]}>
                          <span className={styles["song-name"]}>{name}</span>
                          <span className={styles["artists-name"]}>
                            {artists}
                          </span>
                        </div>
                      </div>
                      <div className={styles["col"]}>
                        <span>{album}</span>
                      </div>
                      <div className={styles["col"]}>
                        <span>{duration}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Body;
