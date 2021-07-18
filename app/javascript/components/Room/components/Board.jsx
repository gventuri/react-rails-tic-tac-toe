import React, { useState, useEffect } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import UserToken from "../../../helpers/UserToken";

// Components
import NextPlayer from "./NextPlayer";
import WinningPlayer from "./WinningPlayer";
import RematchButton from "./RematchButton";
import PlayerSymbol from "./PlayerSymbol";
import DrawMessage from "./DrawMessage";

// Models
import Move from "../../../models/Move";
import Room from "../../../models/Room";

// Constants
const CHANNEL_NAME = "RoomsChannel";

const Cell = ({ symbol, onChange }) => {
  const onClick = () => {
    if (!symbol) onChange();
  };

  return (
    <div className="col col-4 p-2">
      <div
        className={classNames("cell", {
          [`cell-${symbol}`]: symbol,
        })}
        onClick={onClick}
        role="button"
        tabIndex="0"
      />
    </div>
  );
};

Cell.propTypes = {
  symbol: PropTypes.string,
  onChange: PropTypes.func,
};

Cell.defaultProps = {
  symbol: "x",
  onChange: () => {
    console.log("The value of the cell has been changed");
  },
};

const Board = ({ defaultCells, playerSymbol }) => {
  const [cells, setCells] = useState(defaultCells);
  const [nextPlayer, setNextPlayer] = useState("x");
  const [winner, setWinner] = useState(null);
  const [isOver, setIsOver] = useState(false);
  const { roomId } = useParams();

  const calculateWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a]);
        break;
      }
    }
  };

  const calculateIsOver = () => {
    if (Object.values(cells).filter((c) => c === null).length === 0)
      setIsOver(true);
  };

  const updateNextPlayer = () => {
    const xMoves = Object.values(cells).filter((c) => c === "x").length;
    const oMoves = Object.values(cells).filter((c) => c === "o").length;

    setNextPlayer(xMoves <= oMoves ? "x" : "o");
  };
  useEffect(() => {
    updateNextPlayer();
    calculateWinner();
    calculateIsOver();
  }, [cells]);

  const updateCell = (key, value) => {
    if (nextPlayer !== playerSymbol) return;

    setCells({
      ...cells,
      [key]: value,
    });

    Move.create({
      roomId,
      playerCode: UserToken.findOrCreate(),
      cellId: key,
    });
  };

  useEffect(() => {
    Move.get({ roomId }).then((moves) => {
      const newCells = {};
      moves.forEach((move) => {
        newCells[move.cell_id] = move.symbol;
      });

      setCells({
        ...cells,
        ...newCells,
      });
    });
  }, []);

  const handleReceivedMessages = ({ rematch, cell_id: cellId, symbol }) => {
    console.log("Hello there...", { rematch, cell_id: cellId, symbol });

    if (rematch) return window.location.reload();

    setCells({
      ...cells,
      [cellId]: symbol,
    });
  };

  const doRematch = () => Room.rematch({ slug: roomId });

  return (
    <>
      <ActionCableConsumer
        channel={{
          channel: CHANNEL_NAME,
          room_id: roomId,
        }}
        onReceived={handleReceivedMessages}
      />

      <div className="my-3">
        {!winner && !isOver && (
          <>
            <PlayerSymbol symbol={playerSymbol} />
            <NextPlayer symbol={nextPlayer} />
          </>
        )}

        {winner && <WinningPlayer symbol={winner} />}
        {!winner && isOver && <DrawMessage />}
        {(winner || isOver) && <RematchButton onClick={doRematch} />}
      </div>

      <div className="row">
        {Object.keys(cells).map((key) => (
          <Cell
            onChange={() => updateCell(key, playerSymbol)}
            symbol={cells[key]}
            key={key}
          />
        ))}
      </div>
    </>
  );
};

Board.propTypes = {
  defaultCells: PropTypes.objectOf(PropTypes.any),
  playerSymbol: PropTypes.string,
};

Board.defaultProps = {
  defaultCells: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  },
  playerSymbol: "x",
};

export { Cell };
export default Board;
