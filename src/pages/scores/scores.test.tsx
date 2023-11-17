import { render, screen } from "@testing-library/react";
import Scores from "./[id]";
import "@testing-library/jest-dom/";
import { LoremIpsum } from "lorem-ipsum";
import { randomInt } from "crypto";
import { ScoreData } from "../../hooks/useScoreData";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
} from "../../utils/scores";
import userEvent from "@testing-library/user-event";

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
          link: "https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c",
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

export const mockScoreData = {
  claimsCreated: mockClaims,
  commentsCreated: [],
  upvotesReceived: 10,
  downvotesReceived: 5,
};

jest.mock("../../hooks/useScoreData", () => ({
  useScoreData: (): ScoreData => mockScoreData,
}));

const mockUser: User = {
  id: 10,
  name: "Leif Etter",
  avatar:
    "https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c",
  biography: lorem.generateWords(20),
};

jest.mock("../../hooks/useUserDetails", () => ({
  useUserDetails: (): User => mockUser,
}));

describe("should test the scores page", () => {
  const CORRECT_LEVEL: number = 100;

  it("should test the basic page setup", () => {
    render(<Scores />);
    const claimList = screen.getByTestId("claim-list");
    expect(claimList).toBeInTheDocument();
    expect(claimList.children).toHaveLength(10);

    const userLevel = screen.getByTestId("indicator-user-level");
    expect(userLevel).toBeInTheDocument();
    expect(userLevel).toHaveTextContent(`User Level: ${CORRECT_LEVEL}`);

    const userTitle = screen.getByTestId("user-title");
    expect(userTitle).toBeInTheDocument();
    expect(userTitle).toHaveTextContent("Beacon of Truth");

    const userName = screen.getByTestId("user-name");
    expect(userName).toHaveTextContent("Leif Etter");
  });

  it("should test if the right score is shown", () => {
    expect(calculateLevelFromScoreData(mockScoreData)).toBe(100);

    expect(determineUserTitleFromLevel(30)).toBe("Trusted Member");
    expect(determineUserTitleFromLevel(100)).toBe("Beacon of Truth");
  });
});
