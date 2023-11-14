import { render, screen } from "@testing-library/react";
import Scores from "./[id]";
import "@testing-library/jest-dom/";
import { LoremIpsum } from "lorem-ipsum";
import { randomInt } from "crypto";
import { ScoreData } from "../../hooks/useScoreData";
import { calculateLevelFromScoreData } from "../../utils/scores";

const lorem = new LoremIpsum({
  wordsPerSentence: {
    min: 5,
    max: 16,
  },
});

const mockClaims: Claim[] = Array(10)
  .fill(0)
  .map((_) => {
    const id: number = randomInt(999999);
    return {
      id,
      source: lorem.generateWords(3),
      statement: lorem.generateWords(10),
      description: lorem.generateWords(50),
      images: [
        {
          id,
          link: lorem.generateWords(1),
          source: lorem.generateWords(2),
          claimId: 0,
        },
      ],
    };
  });

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: jest.fn(),
      pathname: jest.fn(),
      query: "5",
    };
  },
}));

const mockScoreData = {
  claimsCreated: mockClaims,
  commentsCreated: [],
  upvotesReceived: 10,
  downvotesReceived: 5,
};

jest.mock("../../hooks/useScoreData", () => ({
  useScoreData: (): ScoreData => mockScoreData,
}));

describe("should test the scores page", () => {
  const CORRECT_LEVEL: number = 100;

  it("should test the basic page setup", () => {
    render(<Scores />);
    const claimList = screen.getByTestId("claim-list");
    expect(claimList).toBeInTheDocument();
    expect(claimList.children).toHaveLength(10);

    const userLevel = screen.getByTestId("user-level");
    expect(userLevel).toBeInTheDocument();
    expect(userLevel).toHaveTextContent(`User Level: ${CORRECT_LEVEL}`);
  });

  it("should test if the right score is shown", () => {
    // Function should take in upvotes/downvotes/claims created and comments made and output a number value as a score
    expect(calculateLevelFromScoreData(mockScoreData)).toBe(100);
  });
});
