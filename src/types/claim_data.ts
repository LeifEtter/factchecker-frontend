interface ClaimData {
  title: string;
  titleError: string | null;
  description: string;
  descriptionError: string | null;
  source: string;
  sourceError: string | null;
  categories: string[];
  creatorId: number;
  images: ClaimImageFile[];
}
