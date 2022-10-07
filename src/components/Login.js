import React from "react";

import styles from "./Login.module.css";

function Login() {
  const handleClick = () => {
    // new
    // const clientID = "e9d1a1b733634ce6a9ddeca84e241aca";
    // old
    const clientID = "7ee04dfe5db747d996344df85fe9f0fb";
    const redirectURL = "http://localhost:3000/";
    const apiURL = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];
    //
    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <div className={styles.container}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify-logo"
        className={styles["login-logo-img"]}
      />
      <button className={styles["login-button"]} onClick={handleClick}>
        Connect Spotify
      </button>
    </div>
  );
}

export default Login;
