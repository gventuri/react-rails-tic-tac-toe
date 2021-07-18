import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const WinningPlayer = ({ symbol }) => (
  <h1>
    The winner is:{" "}
    <Image
      title={`Symbol: ${symbol}`}
      src={`/assets/choices/${symbol}.png`}
      width="40"
      height="40"
    />{" "}
    🎉
  </h1>
);

WinningPlayer.propTypes = {
  symbol: PropTypes.string,
};

WinningPlayer.defaultProps = {
  symbol: "x",
};

export default WinningPlayer;
