import React from "react";
import "./style.scss";

// Components
import Board from "./components/Board";
import RoomUrlSharer from "./components/RoomUrlSharer";

const Room = () => (
  <>
    <RoomUrlSharer />

    <Board />
  </>
);

export default Room;
