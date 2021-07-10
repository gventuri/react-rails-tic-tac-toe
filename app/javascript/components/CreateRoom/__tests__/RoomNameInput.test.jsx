import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import RoomNameInput from "../components/RoomNameInput";

afterEach(cleanup);

it("should render create room form", () => {
  render(<RoomNameInput />);

  // Label
  const roomNameLabel = screen.getByLabelText("Enter the room name");
  expect(roomNameLabel).toBeInTheDocument();

  // Field description
  const roomNameDescription = document.querySelector(".text-muted");
  expect(roomNameDescription).toHaveTextContent(
    'Rooms should contain only alphanumeric characters and "-" (0-9, a-Z, -)'
  );
});

it("should show the error message", () => {
  const ERROR_MESSAGE = "Simple error message";

  render(<RoomNameInput isValid={false} error={ERROR_MESSAGE} />);

  // Error message
  const roomNameError = document.querySelector(".invalid-feedback");
  expect(roomNameError).toHaveTextContent(ERROR_MESSAGE);
});

it("matches snapshots", () => {
  const roomNameInput = renderer
    .create(<RoomNameInput value="my-awesome-match" />)
    .toJSON();
  expect(roomNameInput).toMatchSnapshot();
});
