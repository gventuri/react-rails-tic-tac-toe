import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Room from "../Room";

afterEach(cleanup);

const INITIAL_ENTRIES = "/rooms/my-awesome-match";

it("should render room component", () => {
  render(
    <MemoryRouter initialEntries={[INITIAL_ENTRIES]}>
      <Room />
    </MemoryRouter>
  );
});

it("matches snapshots", () => {
  const room = renderer
    .create(
      <MemoryRouter initialEntries={[INITIAL_ENTRIES]}>
        <Room />
      </MemoryRouter>
    )
    .toJSON();
  expect(room).toMatchSnapshot();
});
