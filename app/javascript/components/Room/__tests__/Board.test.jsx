import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Board, { Cell } from "../components/Board";

afterEach(cleanup);

const INITIAL_ENTRIES = "/rooms/my-awesome-match";

it("should render the board", () => {
  render(
    <MemoryRouter initialEntries={[INITIAL_ENTRIES]}>
      <Board />
    </MemoryRouter>
  );
  render(<Cell />);

  // Label
  const cells = document.querySelectorAll(".row .cell");
  expect(cells.length).toBe(9);
});

it("should show the right symbol in the cell", () => {
  render(<Cell symbol={null} />);
  expect(document.querySelectorAll(".cell-x").length).toBe(0);
  expect(document.querySelectorAll(".cell-o").length).toBe(0);
  cleanup();

  render(<Cell symbol="x" />);
  expect(document.querySelectorAll(".cell-x").length).toBe(1);
  expect(document.querySelectorAll(".cell-o").length).toBe(0);
  cleanup();

  render(<Cell symbol="o" />);
  expect(document.querySelectorAll(".cell-x").length).toBe(0);
  expect(document.querySelectorAll(".cell-o").length).toBe(1);
});

it("matches snapshots", () => {
  const roomUrlInput = renderer
    .create(
      <MemoryRouter initialEntries={[INITIAL_ENTRIES]}>
        <Board />
      </MemoryRouter>
    )
    .toJSON();
  expect(roomUrlInput).toMatchSnapshot();
});
