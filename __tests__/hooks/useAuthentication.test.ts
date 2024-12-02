// @vitest-environment jsdom

import { renderHook, waitFor } from "@testing-library/react";
import { useAuthentication } from "../../src/hooks/useAuthentication";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as constants from "../../src/assets/constants";

vi.spyOn(constants, "API", "get").mockReturnValue("http://localhost:3005");

describe("useAuthentication", () => {
  const mockSuccessAuth = {
    status: 200,
    body: {},
  } as Response;

  const mockFailAuth = {
    status: 401,
    body: {},
  } as Response;

  const mockFaultyRequest = {
    status: 501,
    body: {},
  } as Response;

  describe("when hook is loading", () => {
    beforeEach(() => {
      global.fetch = vi
        .fn()
        .mockResolvedValue(Promise.resolve(mockSuccessAuth));
    });
    it("should return initial loading values and then set loading to false", async () => {
      const { result } = renderHook(() => useAuthentication());
      const [isLoading, isAuthenticated] = result.current;
      expect(isLoading).toBe(true);
      expect(isAuthenticated).toBe(null);
      await waitFor(() => expect(result.current[0]).toEqual(false));
    });
  });

  describe("when authentication succeeds", () => {
    beforeEach(() => {
      global.fetch = vi
        .fn()
        .mockResolvedValue(Promise.resolve(mockSuccessAuth));
    });
    it("should return successful auth", async () => {
      const { result } = renderHook(() => useAuthentication());
      await waitFor(() => expect(result.current).toEqual([false, true]));
    });
  });

  describe("when authentication fails", () => {
    beforeEach(() => {
      global.fetch = vi.fn().mockResolvedValue(Promise.resolve(mockFailAuth));
    });

    it("should return failed auth", async () => {
      const { result } = renderHook(() => useAuthentication());
      await waitFor(() => expect(result.current).toEqual([false, false]));
    });
  });

  describe("when authentication request is faulty", () => {
    beforeEach(() => {
      global.fetch = vi
        .fn()
        .mockResolvedValue(Promise.resolve(mockFaultyRequest));
    });

    it("should return failed auth", async () => {
      const { result } = renderHook(() => useAuthentication());
      await waitFor(() => expect(result.current).toEqual([false, false]));
    });
  });
});
