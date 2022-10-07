import React from "react";

import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";

export default function Footer() {
  return (
    <>
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </>
  );
}
