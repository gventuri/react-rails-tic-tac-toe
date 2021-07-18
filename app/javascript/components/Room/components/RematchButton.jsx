import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const RematchButton = ({ onClick }) => (
  <Button variant="primary" onClick={onClick}>
    Play again <FontAwesomeIcon icon={faRedo} size="sm" />
  </Button>
);

RematchButton.propTypes = {
  onClick: PropTypes.func,
};

RematchButton.defaultProps = {
  onClick: () => {
    console.log("Rematch!");
  },
};

export default RematchButton;
