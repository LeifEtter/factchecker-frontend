jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("node-fetch");

it("should test the scores page", () => {});
