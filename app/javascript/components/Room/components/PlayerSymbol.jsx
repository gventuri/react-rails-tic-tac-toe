import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const PlayerSymbol = ({ symbol }) => (
  <div>
    <b>
      Your symbol:{" "}
      <Image
        title={`Symbol: ${symbol}`}
        src={`/assets/choices/${symbol}.png`}
        width="20"
        height="20"
      />
    </b>
  </div>
);

PlayerSymbol.propTypes = {
  symbol: PropTypes.string,
};

PlayerSymbol.defaultProps = {
  symbol: "x",
};

export default PlayerSymbol;
