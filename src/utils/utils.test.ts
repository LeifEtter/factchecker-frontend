import { mockScoreData } from "../pages/scores/scores.test";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
} from "./scores";

describe("testing utils", () => {
  it("should test if the right score is shown", () => {
    expect(calculateLevelFromScoreData(mockScoreData)).toBe(100);

    expect(determineUserTitleFromLevel(30)).toBe("Trusted Member");
    expect(determineUserTitleFromLevel(100)).toBe("Beacon of Truth");
  });
});
