import React, { useState } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Spinner } from "react-bootstrap";
import "./style.scss";

// Components
import Board from "./components/Board";
import RoomUrlSharer from "./components/RoomUrlSharer";

const CHANNEL_NAME = "MovesChannel";

const Room = () => {
  const [connected, setConnected] = useState(false);

  return (
    <>
      <ActionCableConsumer
        channel={{ channel: CHANNEL_NAME }}
        onConnected={() => setConnected(true)}
        onDisconnected={() => setConnected(false)}
      />

      <RoomUrlSharer />

      {connected ? (
        <Board />
      ) : (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default Room;
