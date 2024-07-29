import { mockScoreData } from "../src/mocks/scoreData";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
} from "../src/utils/scores";

describe("testing utils", () => {
  it("should test if the right score is shown", () => {
    expect(calculateLevelFromScoreData(mockScoreData)).toBe(100);

    expect(determineUserTitleFromLevel(30)).toBe("Trusted Member");
    expect(determineUserTitleFromLevel(100)).toBe("Beacon of Truth");
  });
});
