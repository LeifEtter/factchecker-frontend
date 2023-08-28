interface Claim {
  id: number;
  statement: string;
  description: string;
  user_name?: string;
  comments?: ClaimComment[];
  images: ClaimImage[];
}
