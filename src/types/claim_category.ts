interface ClaimCategory {
  id: number;
  name: string;
}

interface ClaimCategoryButtonData {
  name: string;
  active: boolean;
}

interface ClaimCategoryDict {
  [Key: number]: ClaimCategoryButtonData;
}
