import { categoryDict } from "./category";

export const claimQuery: ClaimQuery = {
  endpoint: "claims",
  limit: 10,
  skip: 10,
  orderBy: "comments_created",
  orderByDirection: "DESC",
  keywords: "",
  category: categoryDict,
};
