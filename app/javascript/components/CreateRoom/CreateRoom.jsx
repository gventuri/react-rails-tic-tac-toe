import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import randomstring from "randomstring";
import axios from "axios";
import "./style.scss";

// Components
import RoomNameInput from "./components/RoomNameInput";
import ChooseSymbol from "./components/ChooseSymbol";

const CreateRoom = () => {
  const [formData, updateFormData] = useState({
    roomName: randomstring.generate(),
    selectedChoice: "x",
  });
  const [submitted, updateSubmitted] = useState(false);
  const [errors, updateErrors] = useState({});
  const isSelectedChoice = (choice) => formData.selectedChoice === choice;
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

        <RoomNameInput
          value={formData.roomName}
          onChange={updateField}
          validate={validate}
          isValid={isValid("roomName")}
          error={errors.roomName}
        />

        <ChooseSymbol
          isSelectedChoice={isSelectedChoice}
          onChange={updateSelectedChoice}
        />

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
