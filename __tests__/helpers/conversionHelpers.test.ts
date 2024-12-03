import {
  capitalizeString,
  capitalizeWord,
  cleanTrailingSpecialChars,
  constructQueryUrl,
} from "../../src/helpers/conversionHelpers";
import { describe, it, expect } from "vitest";
import { claimQuery } from "../mocks/objects/queries";
import { categoryDict } from "../mocks/objects/category";

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
  const mockQuery = claimQuery;
  const mockCategoryDict = categoryDict;

  it("should return the proper query string when a claim query is passed", () => {
    expect(constructQueryUrl(mockQuery)).toBe(
      "claims?limit=10&skip=10&orderBy=comments_created&orderByDirection=DESC"
    );
    mockCategoryDict[0].active = true; // images
    mockCategoryDict[6].active = true; // ai
    expect(
      constructQueryUrl({
        ...mockQuery,
        category: mockCategoryDict,
      })
    ).toBe(
      "claims?limit=10&skip=10&orderBy=comments_created&orderByDirection=DESC&category=images,ai"
    );
    expect(
      constructQueryUrl({
        ...mockQuery,
        category: mockCategoryDict,
        keywords: "Trump claims Elon will be new Secretary of State",
      })
    ).toBe(
      "claims?limit=10&skip=10&orderBy=comments_created&orderByDirection=DESC&category=images,ai&keywords=Trump,claims,Elon,will,be,new,Secretary,of,State"
    );
  });
  // TODO: Create Mock User Query
  // it("should return the proper query string when a user query is passed", () => {
  //   expect(
  //     constructQueryUrl({
  //       ...mockQuery,
  //       endpoint: "users",
  //       orderBy: "creation_date",
  //       orderByDirection: "ASC",
  //     })
  //   ).toBe("users?limit=10&skip=10&orderBy=creation_date&orderByDirection=ASC");
  // });
});
