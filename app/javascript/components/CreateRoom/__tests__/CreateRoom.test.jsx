import React from "react";
import { render } from "@testing-library/react";
import CreateRoom from "../CreateRoom";

it("should render create room form", () => {
  render(<CreateRoom />);

  // Welcome message
  const welcomeMessage = document.querySelector("h1");
  expect(welcomeMessage).toBeInTheDocument();
  expect(welcomeMessage).toHaveTextContent("Welcome to TicTacToe!");

  // Form
  const form = document.querySelector("form");
  expect(form).toBeInTheDocument();
});
