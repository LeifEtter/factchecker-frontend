interface Claim {
  id: number;
  source: string;
  statement: string;
  description: string;
  user_name?: string;
  comments?: ClaimComment[];
  images: ClaimImage[];
  vote_true?: number;
  vote_false?: number;
}
