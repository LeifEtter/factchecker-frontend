import {
  isEmail,
  isPassword,
  isValidUrl,
} from "../../src/helpers/validationHelpers";
import { describe, it, expect } from "vitest";

describe("testing functionality", () => {
  it("should test email validity", () => {
    expect(isEmail("etter.leif@gmail.com")).toBe(true);
    expect(isEmail("etter.leif.com")).toBe(false);
    expect(isEmail("@gmail.com")).toBe(false);
  });

  it("should test password validity", () => {
    expect(isPassword("Test@1234")).toBe(true);
    expect(isEmail("Test1234")).toBe(false);
    expect(isEmail("@Test")).toBe(false);
  });

  it("should test proper url validation", () => {
    expect(isValidUrl("http://foo.com/blah_blah")).toBe(true);
    expect(isValidUrl("http://code.google.com/events/#&product=browser")).toBe(
      true
    );
    expect(isValidUrl("foo.com")).toBe(false);
    expect(isValidUrl("http://../")).toBe(false);
    expect(isValidUrl("http://.www.foo.bar/")).toBe(false);
  });
});
