import { render, screen } from "@testing-library/react";
import Scores from "./[id]";
import "@testing-library/jest-dom/";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: jest.fn(),
      pathname: jest.fn(),
      query: "5",
    };
  },
}));

jest.mock("../../hooks/useScoreData", () => ({
  useScoreData: () => [],
}));

describe("should test the scores page", () => {
  it("should test the basic page setup", () => {
    render(<Scores />);
    const claimList = screen.getByTestId("claim-list");
    expect(claimList.children).toHaveLength(10);
  });
});
