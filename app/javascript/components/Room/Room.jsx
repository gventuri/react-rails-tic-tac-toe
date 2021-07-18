import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Spinner, Alert } from "react-bootstrap";
import UserToken from "../../helpers/UserToken";

import "./style.scss";

// Components
import Board from "./components/Board";
import RoomUrlSharer from "./components/RoomUrlSharer";

// Models
import RoomModel from "../../models/Room";

const CHANNEL_NAME = "RoomsChannel";

const RoomFull = () => (
  <>
    <Alert variant="danger">
      The room is full. <Link to="/">Go back</Link>
    </Alert>
  </>
);

const Connecting = () => (
  <div className="text-center my-5">
    <Spinner animation="border" />
  </div>
);

const Room = () => {
  const { roomId } = useParams();
  const [authenticated, setAuthenticated] = useState();
  const [playerSymbol, setPlayerSymbol] = useState("x");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    RoomModel.join({ slug: roomId, challengerCode: UserToken.findOrCreate() })
      .then((res) => {
        setAuthenticated(true);
        setPlayerSymbol(res.symbol);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const isNotAuthenticated = () => authenticated === false;
  const isConnected = () => authenticated === true && connected;

  return (
    <>
      <ActionCableConsumer
        channel={{ channel: CHANNEL_NAME, room_id: roomId }}
        onConnected={() => setConnected(true)}
        onDisconnected={() => setConnected(false)}
      />

      <RoomUrlSharer />

      {isConnected() ? (
        <Board playerSymbol={playerSymbol} />
      ) : isNotAuthenticated() ? (
        <RoomFull />
      ) : (
        <Connecting />
      )}
    </>
  );
};

export default Room;
