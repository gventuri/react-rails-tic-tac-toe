import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const RoomNameInput = ({ value, onChange, validate, isValid, error }) => (
  <Form.Group>
    <Form.Label>Enter the room name</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter room name"
      name="roomName"
      value={value}
      onChange={onChange}
      onKeyUp={validate}
      isInvalid={!isValid}
    />
    {isValid && (
      <Form.Text className="text-muted">
        Rooms should contain only alphanumeric characters and "-" (0-9, a-Z, -)
      </Form.Text>
    )}
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

RoomNameInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.func,
  isValid: PropTypes.bool,
  error: PropTypes.string,
};

RoomNameInput.defaultProps = {
  value: null,
  onChange: (choice) => {
    console.log("The value has changed to ", choice);
  },
  validate: () => {},
  isValid: true,
  error: null,
};

export default RoomNameInput;
