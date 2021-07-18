import React, { useState, useEffect } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import UserToken from "../../../helpers/UserToken";

// Models
import Move from "../../../models/Move";

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

const NextPlayer = ({ symbol }) => <b>Next player: {symbol}</b>;

NextPlayer.propTypes = {
  symbol: PropTypes.string,
};

NextPlayer.defaultProps = {
  symbol: "x",
};

const Board = ({ defaultCells, playerSymbol }) => {
  const [cells, setCells] = useState(defaultCells);
  const [nextPlayer, setNextPlayer] = useState("x");
  const { roomId } = useParams();

  const updateNextPlayer = () => {
    const xMoves = Object.values(cells).filter((c) => c === "x").length;
    const oMoves = Object.values(cells).filter((c) => c === "o").length;

    setNextPlayer(xMoves <= oMoves ? "x" : "o");
  };
  useEffect(() => {
    updateNextPlayer();
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

  const handleReceivedMessages = ({ cell_id: cellId, symbol }) => {
    setCells({
      ...cells,
      [cellId]: symbol,
    });
  };

  return (
    <>
      <ActionCableConsumer
        channel={{
          channel: CHANNEL_NAME,
          room_id: roomId,
        }}
        onReceived={handleReceivedMessages}
      />

      <NextPlayer symbol={nextPlayer} />
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
