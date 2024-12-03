import { categoryResponse } from "../mocks/api/category";
import { describe, beforeEach, vi } from "vitest";

describe("useFetchCategories", () => {
  beforeEach(() => {
    const mockResponse = { status: 200, body: categoryResponse };
    vi.fn().mockResolvedValue(mockResponse);
  });

  // it("should return the proper list of categories", () => {
  //   const { result } =
  // });
});
