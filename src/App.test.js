import {
  findLongestDownward,
  findMaxVolume,
  findMaxPrice,
  findMinPrice,
  findDatesPrices,
} from "./utils";
import App from "./App";
import expect from "expect";
import renderer from "react-test-renderer";

//snapshot test
test("renders App component", () => {
  const componentTree = renderer.create(<App />).toJSON();
  expect(componentTree).toMatchSnapshot();
});

//unit test

const financialData = [
  [1, 2],
  [2, 3],
  [3, 2],
  [3, 4],
  [2, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [5, 4],
  [4, 3],
  [3, 2],
  [2, 1],
];
//unit test

const test_dates = [1, 2, 3, 3, 2, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2];
const test_prices = [2, 3, 2, 4, 1, 2, 3, 4, 5, 6, 7, 4, 3, 2, 1];

describe("functions test", () => {
  it("finds longest downward", () => {
    const longestDown = findLongestDownward(financialData);
    expect(longestDown).toEqual(4);
  });
  it("finds dates", () => {
    const dates = findDatesPrices(financialData)[0];
    expect(dates.map((item) => item)).toEqual(test_dates.map((item) => item));
  });
  it("finds prices", () => {
    const prices = findDatesPrices(financialData)[1];
    expect(prices.map((item) => item)).toEqual(test_prices.map((item) => item));
  });
  it("finds max volume", () => {
    const maxData = findMaxVolume(financialData);
    expect(maxData[1]).toEqual(6);
  });
  it("finds max price", () => {
    const maxData = findMaxPrice(financialData);
    expect(maxData).toEqual(6);
  });
  it("finds min price", () => {
    const minData = findMinPrice(financialData);
    expect(minData).toEqual(2);
  });
});
