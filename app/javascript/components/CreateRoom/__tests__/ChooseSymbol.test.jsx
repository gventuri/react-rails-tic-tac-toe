import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import ChooseSymbol from "../components/ChooseSymbol";

afterEach(cleanup);

it("should render symbol picker", () => {
  render(<ChooseSymbol />);

  // Label
  const chooseSymbolLabel = document.querySelector("label");
  expect(chooseSymbolLabel).toBeInTheDocument();
  expect(chooseSymbolLabel).toHaveTextContent("Choose your symbol");

  // Cards
  const cards = document.querySelectorAll(".card");
  expect(cards.length).toBe(2);
});

it("should have the X choice selected by default", () => {
  render(<ChooseSymbol isSelectedChoice={(choice) => choice === "x"} />);

  const selectedCard = document.querySelector(".selected img");
  expect(selectedCard.getAttribute("title")).toBe("Option: x");
});

it("matches snapshots", () => {
  const chooseSymbol = renderer.create(<ChooseSymbol />).toJSON();
  expect(chooseSymbol).toMatchSnapshot();
});
