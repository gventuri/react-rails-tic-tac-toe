import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import UserToken from "../../../helpers/UserToken";

// Models
import Move from "../../../models/Move";

const Cell = ({ symbol, onChange }) => (
  <div className="col col-4 p-2">
    <div
      className={classNames("cell", {
        [`cell-${symbol}`]: symbol,
      })}
      onClick={() => onChange("x")}
      role="button"
      tabIndex="0"
    />
  </div>
);

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

const Board = ({ defaultCells }) => {
  const [cells, setCells] = useState(defaultCells);
  const { roomId } = useParams();

  const updateCell = (key, value) => {
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

  return (
    <div className="row">
      {Object.keys(cells).map((key) => (
        <Cell
          onChange={(newValue) => updateCell(key, newValue)}
          symbol={cells[key]}
          key={key}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  defaultCells: PropTypes.objectOf(PropTypes.any),
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
};

export { Cell };
export default Board;
