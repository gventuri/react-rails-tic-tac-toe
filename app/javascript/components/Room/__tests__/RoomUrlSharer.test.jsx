import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import RoomUrlSharer from "../components/RoomUrlSharer";

afterEach(cleanup);

const INITIAL_ENTRIES = "/rooms/my-awesome-match";

it("should render room url sharer", () => {
  render(
    <MemoryRouter initialEntries={[INITIAL_ENTRIES]}>
      <RoomUrlSharer />
    </MemoryRouter>
  );

  // Label
  const roomUrlInput = screen.getByLabelText(
    "Invite other players (copy link to the clipboard)"
  );
  expect(roomUrlInput).toBeInTheDocument();
});

it("matches snapshots", () => {
  const roomUrlInput = renderer
    .create(
      <MemoryRouter initialEntries={[INITIAL_ENTRIES]}>
        <RoomUrlSharer />
      </MemoryRouter>
    )
    .toJSON();
  expect(roomUrlInput).toMatchSnapshot();
});
