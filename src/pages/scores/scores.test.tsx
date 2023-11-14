import { render, screen } from "@testing-library/react";
import Scores from "./[id]";
import "@testing-library/jest-dom/";
import { LoremIpsum } from "lorem-ipsum";
import { randomInt } from "crypto";
import { ScoreData } from "../../hooks/useScoreData";

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

jest.mock("../../hooks/useScoreData", () => ({
  useScoreData: (): ScoreData => ({
    claimsCreated: mockClaims,
    commentsCreated: [],
    upvotesReceived: 10,
    downvotesReceived: 5,
  }),
}));

describe("should test the scores page", () => {
  it("should test the basic page setup", () => {
    render(<Scores />);
    const claimList = screen.getByTestId("claim-list");
    expect(claimList.children).toHaveLength(10);
  });
});
