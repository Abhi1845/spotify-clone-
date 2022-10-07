import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./Spotify.module.css";

function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState();

  const bodyRef = useRef();

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userID: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [token, dispatch]);

  return (
    <div className={styles["spotify-container"]}>
      <div className={styles["spotify-body"]}>
        <Sidebar />
        <div className={styles["body"]} ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className={styles["body-container"]}>
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className={styles["spotify-footer"]}>
        <Footer />
      </div>
    </div>
  );
}

export default Spotify;
