import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const NextPlayer = ({ symbol }) => (
  <div>
    <b>
      Current player:{" "}
      <Image
        title={`Symbol: ${symbol}`}
        src={`/assets/choices/${symbol}.png`}
        width="20"
        height="20"
      />
    </b>
  </div>
);

NextPlayer.propTypes = {
  symbol: PropTypes.string,
};

NextPlayer.defaultProps = {
  symbol: "x",
};

export default NextPlayer;
