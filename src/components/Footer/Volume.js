import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import styles from "./Volume.module.css";
import axios from "axios";

function Volume() {
  const [{ token }] = useStateProvider();

  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: { volume_percent: parseInt(e.target.value) },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className={styles["volume-container"]}>
      <input
        type="range"
        min={0}
        max={100}
        onMouseUp={setVolume}
        className={styles["volume-bar"]}
      />
    </div>
  );
}

export default Volume;
