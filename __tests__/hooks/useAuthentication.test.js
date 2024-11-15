import { renderHook, waitFor } from "@testing-library/react";
import { useAuthentication } from "../../src/hooks/useAuthentication";

global.fetch = jest.fn();

describe("useAuthentication", () => {
  it("should return initial loading values", () => {
    const { result } = renderHook(() => useAuthentication());
    const [isLoading, isAuthenticated] = result.current;
    expect(isLoading).toBe(true);
    expect(isAuthenticated).toBe(null);
  });

  describe("when authentication succeeds", () => {
    beforeEach(() => {
      let mockAuth = {
        status: 200,
      };
      global.fetch.mockResolvedValue(mockAuth);
    });

    it("should return successful auth", async () => {
      const { result } = renderHook(() => useAuthentication());
      await waitFor(() => expect(result.current).toEqual([false, true]));
    });
  });

  describe("when authentication fails", () => {
    beforeEach(() => {
      let mockAuth = {
        status: 401,
      };
      global.fetch.mockResolvedValue(mockAuth);
    });

    it("should return failed auth", async () => {
      const { result } = renderHook(() => useAuthentication());
      await waitFor(() => expect(result.current).toEqual([false, false]));
    });
  });

  describe("when authentication request is faulty", () => {
    beforeEach(() => {
      let mockAuth = {
        status: 501,
      };
      global.fetch.mockResolvedValue(mockAuth);
    });

    it("should return failed auth", async () => {
      const { result } = renderHook(() => useAuthentication());
      await waitFor(() => expect(result.current).toEqual([false, false]));
    });
  });
});
