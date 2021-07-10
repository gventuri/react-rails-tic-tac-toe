/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Form, Row, Col, Button, Card, Image, Alert } from "react-bootstrap";
import classNames from "classnames";
import randomstring from "randomstring";
import axios from "axios";
import "./style.scss";

const CreateRoom = () => {
  const CHOOSE_OPTIONS = ["x", "o"];

  const [formData, updateFormData] = useState({
    roomName: randomstring.generate(),
    selectedChoice: "x",
  });
  const isSelectedChoice = (choice) => formData.selectedChoice === choice;
  const [submitted, updateSubmitted] = useState(false);
  const [errors, updateErrors] = useState({});
  const isValid = (field) => !submitted || !errors[field];

  // Checks if the form is valid and ready to be submitted
  // Returns a boolean (true if the form is valid, otherwise false)
  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!formData.roomName) {
      newErrors = { ...newErrors, roomName: "You must name your room" };
      valid = false;
    }

    updateErrors(newErrors);

    return valid;
  };

  const updateField = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateSelectedChoice = (newValue) => {
    updateFormData({ ...formData, selectedChoice: newValue });
  };

  const getOrCreateUserToken = () => "first-random-player";

  const inviterStarts = () => formData.selectedChoice === "x";

  const submitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    updateSubmitted(true);

    const validation = validate();
    if (!validation) return;

    axios
      .post("/rooms", {
        slug: formData.roomName,
        inviter_code: getOrCreateUserToken(),
        inviter_starts: inviterStarts(),
      })
      .then((response) => {
        window.location.href = response.headers.location;
      })
      .catch((error) => {
        updateErrors({ form: error.response.data.error });
      });
  };

  return (
    <>
      <h1>Welcome to TicTacToe!</h1>
      <Form onSubmit={submitForm}>
        {!isValid("form") && <Alert variant="danger">{errors.form}</Alert>}

        <Form.Group>
          <Form.Label>Enter the room name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room name"
            name="roomName"
            value={formData.roomName}
            onChange={updateField}
            onKeyUp={validate}
            isInvalid={!isValid("roomName")}
          />
          {isValid("roomName") && (
            <Form.Text className="text-muted">
              Rooms should contain only alphanumeric characters and "-" (0-9,
              a-Z, -)
            </Form.Text>
          )}
          <Form.Control.Feedback type="invalid">
            {errors.roomName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Choose your symbol</Form.Label>
          <Row>
            {CHOOSE_OPTIONS.map((choice) => (
              <Col key={choice}>
                <Card
                  className={classNames("card-choice", {
                    selected: isSelectedChoice(choice),
                  })}
                  onClick={() => updateSelectedChoice(choice)}
                >
                  <Card.Body className="text-center">
                    <Image
                      src={`/assets/choices/${choice}.png`}
                      width="100"
                      height="100"
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Form.Group>
        <div className="text-center mt-5">
          <Button variant="primary" type="submit" size="lg">
            Create room
          </Button>
        </div>
      </Form>
    </>
  );
};
export default CreateRoom;
