import React from "react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlist from "./Playlists";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles["sidebar-container"]}>
      <div className="top-links">
        <div className={styles["logo"]}>
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify-logo"
            className={styles["sidebar-logo"]}
          />
        </div>
        <ul className={styles.links}>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlist />
    </div>
  );
}

export default Sidebar;
