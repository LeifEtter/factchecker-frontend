import { isEmail, isPassword } from "../../src/helpers/helpers";

describe("testing functionality", async () => {
  it("should test email validity", async () => {
    expect(isEmail("etter.leif@gmail.com")).toBe(true);
    expect(isEmail("etter.leif.com")).toBe(false);
    expect(isEmail("@gmail.com")).toBe(false);
  });
  it("should test password validity", async () => {
    expect(isPassword("Test@1234")).toBe(true);
    expect(isEmail("Test1234")).toBe(false);
    expect(isEmail("@Test")).toBe(false);
  });
});
