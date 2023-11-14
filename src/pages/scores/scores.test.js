import { render } from "@testing-library/react";
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

describe("should test the scores page", () => {
  it("should test the basic page setup", () => {
    render(<Scores />);
  });
});
