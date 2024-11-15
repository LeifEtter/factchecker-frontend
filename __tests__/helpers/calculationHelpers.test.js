import { calculateTruthFactor } from "../../src/helpers/calculationHelpers";

describe("testing truth factor", () => {
  it("should return null when appropriate conditions aren't met", () => {
    expect(calculateTruthFactor({ vote_true: 0 })).toBe(null);
    expect(calculateTruthFactor({ vote_false: 0 })).toBe(null);
    expect(calculateTruthFactor({})).toBe(null);
  });

  it("should return the proper calculated value when true and false votes are present", () => {
    expect(
      Math.floor(calculateTruthFactor({ vote_false: 5, vote_true: 10 }))
    ).toBe(66);
    expect(calculateTruthFactor({ vote_false: 0, vote_true: 3 })).toBe(100);
    expect(calculateTruthFactor({ vote_false: 5, vote_true: 0 })).toBe(0);
    expect(calculateTruthFactor({ vote_false: 0, vote_true: 0 })).toBe(50);
  });
});
