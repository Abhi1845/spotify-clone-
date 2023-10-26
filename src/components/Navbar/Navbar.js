import React from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styles from "./Navbar.module.css";
import { useStateProvider } from "../../utils/StateProvider";

function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();

  return (
    <div
      className={`${styles.navbar} ${navBackground ? styles.new : styles.old}`}
    >
      <div className={styles["search-bar"]}>
        <FaSearch />
        <input type="text" placeholder="What do you want to listen to?" />
      </div>
      <div className={styles["avatar"]}>
        {/* <a href="#"> */}
        <CgProfile />
        <span>{userInfo?.userName}</span>
        {/* </a> */}
      </div>
    </div>
  );
}

export default Navbar;
