import {
  capitalizeString,
  capitalizeWord,
  cleanTrailingSpecialChars,
  constructQueryUrl,
} from "../../src/helpers/conversionHelpers";

describe("capitalization function", () => {
  it("should return a capitalized word", () => {
    expect(capitalizeWord("hello")).toBe("Hello");
    expect(capitalizeWord("FACTS")).toBe("Facts");
    expect(capitalizeWord("@ACTS")).toBe("@acts");
  });

  it("should return properly capitalized string", () => {
    expect(capitalizeString("hello world")).toBe("Hello World");
    expect(capitalizeString("hello World")).toBe("Hello World");
    expect(capitalizeString("leif")).toBe("Leif");
    expect(capitalizeString("")).toBe("");
  });
});

describe("function for cleaning trailing chars", () => {
  it("should return a string with the special characters at the end removes", () => {
    expect(cleanTrailingSpecialChars("claims?category=media,")).toBe(
      "claims?category=media"
    );
    expect(cleanTrailingSpecialChars("skip=10&limit=5&")).toBe(
      "skip=10&limit=5"
    );
  });
});

describe("functionality for constructing queries from query objects", () => {
  let mockQuery = {
    endpoint: "claims",
    limit: 10,
    skip: 10,
    orderBy: "comments_created",
    orderByDirection: "DESC",
    keywords: "",
  };
  let mockCategoryDict = {
    0: { name: "social media", active: false },
    1: { name: "image", active: true },
    2: { name: "ai", active: true },
  };
  it("should return the proper query string when a claim query is passed", () => {
    expect(constructQueryUrl(mockQuery)).toBe(
      "claims?limit=10&skip=10&orderBy=comments_created&orderByDirection=DESC"
    );
    expect(
      constructQueryUrl({ ...mockQuery, category: mockCategoryDict })
    ).toBe(
      "claims?limit=10&skip=10&orderBy=comments_created&orderByDirection=DESC&category=image,ai"
    );
    expect(
      constructQueryUrl({
        ...mockQuery,
        category: mockCategoryDict,
        keywords: "Trump claims Elon will be new Secretary of State",
      })
    ).toBe(
      "claims?limit=10&skip=10&orderBy=comments_created&orderByDirection=DESC&category=image,ai&keywords=Trump,claims,Elon,will,be,new,Secretary,of,State"
    );
  });
  it("should return the proper query string when a user query is passed", () => {
    expect(
      constructQueryUrl({
        ...mockQuery,
        endpoint: "users",
        orderBy: "creation_date",
        orderByDirection: "ASC",
      })
    ).toBe("users?limit=10&skip=10&orderBy=creation_date&orderByDirection=ASC");
  });
});
