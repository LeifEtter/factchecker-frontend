type ClaimQuery = {
  endpoint: string;
  limit: number;
  skip: number | null;
  orderBy: string;
  orderByDirection: string;
  category: ClaimCategoryDict;
  keywords: string;
};
