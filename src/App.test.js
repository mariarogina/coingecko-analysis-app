import { render, screen } from "@testing-library/react";
import {
  findLongestDownward,
  findMaxVolume,
  findMaxPrice,
  findMinPrice,
} from "./utils";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
